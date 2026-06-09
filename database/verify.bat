@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo ============================================================
echo    领券中心数据库一键验证工具
echo ============================================================
echo.

set DB_HOST=127.0.0.1
set DB_PORT=3306
set DB_USER=root
set DB_PASS=
set DB_NAME=coupon_test_db

set /p DB_HOST="数据库主机地址 [127.0.0.1]: "
if "%DB_HOST%"=="" set DB_HOST=127.0.0.1

set /p DB_PORT="数据库端口 [3306]: "
if "%DB_PORT%"=="" set DB_PORT=3306

set /p DB_USER="数据库用户名 [root]: "
if "%DB_USER%"=="" set DB_USER=root

set /p "DB_PASS=数据库密码: "

set /p DB_NAME="测试数据库名 [coupon_test_db]: "
if "%DB_NAME%"=="" set DB_NAME=coupon_test_db

echo.
echo [1/7] 正在测试数据库连接...
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -e "SELECT 1 AS test;" >nul 2>&1
if errorlevel 1 (
    echo [错误] 数据库连接失败，请检查用户名密码是否正确。
    pause
    exit /b 1
)
echo         连接成功 ✓
echo.

echo [2/7] 检查 SQL 脚本文件...
set MISSING_FILE=0
if not exist "migrations\V1__create_coupon_tables.sql" (
    echo         [缺失] migrations\V1__create_coupon_tables.sql
    set MISSING_FILE=1
) else (
    echo         [存在] migrations\V1__create_coupon_tables.sql
)
if not exist "rollbacks\V1__drop_coupon_tables.sql" (
    echo         [缺失] rollbacks\V1__drop_coupon_tables.sql
    set MISSING_FILE=1
) else (
    echo         [存在] rollbacks\V1__drop_coupon_tables.sql
)
if not exist "seeds\V1__seed_coupon_data.sql" (
    echo         [缺失] seeds\V1__seed_coupon_data.sql
    set MISSING_FILE=1
) else (
    echo         [存在] seeds\V1__seed_coupon_data.sql
)
if "%MISSING_FILE%"=="1" (
    echo [错误] 部分SQL文件缺失！
    pause
    exit /b 1
)
echo         全部文件存在 ✓
echo.

echo [3/7] 创建测试数据库并执行建表脚本...
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -e "DROP DATABASE IF EXISTS `%DB_NAME%`;" >nul 2>&1
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -e "CREATE DATABASE `%DB_NAME%` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" >nul 2>&1
if errorlevel 1 (
    echo [错误] 创建测试数据库失败！
    pause
    exit /b 1
)
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% < "migrations\V1__create_coupon_tables.sql" >nul 2>&1
if errorlevel 1 (
    echo [错误] 执行建表脚本失败！
    mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% < "migrations\V1__create_coupon_tables.sql" 2>&1
    pause
    exit /b 1
)
echo         建表成功 ✓
echo.

echo [4/7] 验证表结构和字段...
set TABLE_ERROR=0

for %%t in (coupon user_coupon) do (
    mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "DESCRIBE %%t;" >nul 2>&1
    if errorlevel 1 (
        echo         [缺失] 表 %%t 不存在
        set TABLE_ERROR=1
    ) else (
        echo         [存在] 表 %%t
    )
)

set COUPON_FIELDS=id name coupon_type coupon_type_name discount_type discount_value min_amount max_discount category_id category_name valid_type valid_from valid_to valid_days stock received_count used_count limit_per_user limit_self_point_id description usage_note sort status created_at updated_at deleted_at
for %%f in (%COUPON_FIELDS%) do (
    mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "DESCRIBE coupon;" 2>nul | findstr /c:"%%f" >nul
    if errorlevel 1 (
        echo         [缺失] coupon.%%f 字段
        set TABLE_ERROR=1
    )
)

set USER_COUPON_FIELDS=id user_id coupon_id coupon_name coupon_type discount_type discount_value min_amount valid_start_time valid_end_time use_status use_time order_id order_no receive_time source created_at updated_at
for %%f in (%USER_COUPON_FIELDS%) do (
    mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "DESCRIBE user_coupon;" 2>nul | findstr /c:"%%f" >nul
    if errorlevel 1 (
        echo         [缺失] user_coupon.%%f 字段
        set TABLE_ERROR=1
    )
)

if "%TABLE_ERROR%"=="0" echo         全部字段验证通过 ✓
echo.

echo [5/7] 验证索引（无冲突）...
set INDEX_ERROR=0

set COUPON_INDEXES=idx_coupon_type idx_status idx_limit_self_point_id idx_sort
for %%i in (%COUPON_INDEXES%) do (
    mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "SHOW INDEX FROM coupon;" 2>nul | findstr /c:"%%i" >nul
    if errorlevel 1 (
        echo         [缺失] coupon 索引 %%i
        set INDEX_ERROR=1
    ) else (
        echo         [存在] coupon 索引 %%i
    )
)

set USER_COUPON_INDEXES=idx_user_id idx_coupon_id idx_use_status idx_valid_end_time
for %%i in (%USER_COUPON_INDEXES%) do (
    mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "SHOW INDEX FROM user_coupon;" 2>nul | findstr /c:"%%i" >nul
    if errorlevel 1 (
        echo         [缺失] user_coupon 索引 %%i
        set INDEX_ERROR=1
    ) else (
        echo         [存在] user_coupon 索引 %%i
    )
)

if "%INDEX_ERROR%"=="0" echo         全部索引验证通过 ✓
echo.

echo [6/7] 验证 CRUD 数据操作...
set CRUD_ERROR=0

echo         测试 INSERT (新增优惠券)...
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "INSERT INTO coupon (name, coupon_type, coupon_type_name, discount_type, discount_value, min_amount, valid_type, valid_from, valid_to, stock, sort, status) VALUES ('验证测试券', 1, '满减券', 1, 10.00, 50.00, 1, '2024-01-01 00:00:00', '2026-12-31 23:59:59', 100, 50, 1);" >nul 2>&1
if errorlevel 1 (
    echo         [失败] INSERT coupon 失败
    set CRUD_ERROR=1
) else (
    echo         [成功] INSERT coupon
)

echo         测试 INSERT (新增用户领券记录)...
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "INSERT INTO user_coupon (user_id, coupon_id, coupon_name, coupon_type, discount_type, discount_value, min_amount, valid_start_time, valid_end_time, use_status, source) VALUES (1001, 1, '验证测试券', 1, 1, 10.00, 50.00, '2024-01-01 00:00:00', '2026-12-31 23:59:59', 0, 1);" >nul 2>&1
if errorlevel 1 (
    echo         [失败] INSERT user_coupon 失败
    set CRUD_ERROR=1
) else (
    echo         [成功] INSERT user_coupon
)

echo         测试 SELECT (查询数据)...
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "SELECT id, name, stock FROM coupon WHERE id = 13;" 2>nul | findstr /c:"验证测试券" >nul
if errorlevel 1 (
    echo         [失败] SELECT 查询失败
    set CRUD_ERROR=1
) else (
    echo         [成功] SELECT 查询
)

echo         测试 UPDATE (修改数据 - 扣减库存)...
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "UPDATE coupon SET stock = stock - 1, received_count = received_count + 1 WHERE id = 13;" >nul 2>&1
if errorlevel 1 (
    echo         [失败] UPDATE coupon 失败
    set CRUD_ERROR=1
) else (
    mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "SELECT stock, received_count FROM coupon WHERE id = 13;" 2>nul | findstr /c:"99" >nul
    if errorlevel 1 (
        echo         [失败] UPDATE 后数据验证失败
        set CRUD_ERROR=1
    ) else (
        echo         [成功] UPDATE 库存扣减 (stock: 100 -^> 99)
    )
)

echo         测试 UPDATE (修改状态 - 使用优惠券)...
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -e "UPDATE user_coupon SET use_status = 1, use_time = NOW(), order_id = 1001, order_no = 'ORD20240101001' WHERE id = 1;" >nul 2>&1
if errorlevel 1 (
    echo         [失败] UPDATE user_coupon 状态失败
    set CRUD_ERROR=1
) else (
    echo         [成功] UPDATE 优惠券使用状态
)

if "%CRUD_ERROR%"=="0" echo         全部 CRUD 操作验证通过 ✓
echo.

echo [7/7] 导入示例数据并验证...
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% < "seeds\V1__seed_coupon_data.sql" >nul 2>&1
if errorlevel 1 (
    echo         [失败] 导入示例数据失败
) else (
    for /f "delims=" %%a in ('mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -D %DB_NAME% -N -e "SELECT COUNT(*) FROM coupon;" 2^>nul') do set COUPON_COUNT=%%a
    echo         示例数据导入成功，coupon 表共 !COUPON_COUNT! 条记录 ✓
)
echo.

echo ============================================================
echo    验证完成
echo ============================================================
echo.
echo 测试数据库: %DB_NAME%
echo 如需清理测试数据，可执行:
echo   DROP DATABASE `%DB_NAME%`;
echo.

pause
