@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ============================================================
echo    领券中心数据库一键回滚脚本
echo ============================================================
echo.
echo 警告: 此操作将删除以下表及其所有数据:
echo   - coupon          (优惠券主表)
echo   - user_coupon     (用户领券记录表)
echo.
echo 请确认已备份数据后再继续!
echo.

set /p CONFIRM="确认执行回滚? (输入 YES 确认, 其他取消): "
if /i not "%CONFIRM%"=="YES" (
    echo [信息] 操作已取消.
    pause
    exit /b 0
)

echo.
set DB_HOST=127.0.0.1
set DB_PORT=3306
set DB_USER=root
set DB_PASSWORD=
set DB_NAME=community_fresh_food

set /p DB_HOST="请输入数据库主机地址 [默认: 127.0.0.1]: "
if "%DB_HOST%"=="" set DB_HOST=127.0.0.1

set /p DB_PORT="请输入数据库端口 [默认: 3306]: "
if "%DB_PORT%"=="" set DB_PORT=3306

set /p DB_USER="请输入数据库用户名 [默认: root]: "
if "%DB_USER%"=="" set DB_USER=root

set /p DB_PASSWORD="请输入数据库密码: "

set /p DB_NAME="请输入数据库名 [默认: community_fresh_food]: "
if "%DB_NAME%"=="" set DB_NAME=community_fresh_food

echo.
echo [信息] 正在连接数据库...

set MYSQL_CMD=mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER%
if not "%DB_PASSWORD%"=="" set MYSQL_CMD=%MYSQL_CMD% -p%DB_PASSWORD%

%MYSQL_CMD% -e "SELECT 1;" >nul 2>&1
if errorlevel 1 (
    echo [错误] 数据库连接失败, 请检查配置!
    pause
    exit /b 1
)

echo [信息] 数据库连接成功!
echo.
echo [信息] 正在执行回滚脚本...

set SCRIPT_DIR=%~dp0rollbacks
set SQL_FILE=%SCRIPT_DIR%\V1__drop_coupon_tables.sql

if not exist "%SQL_FILE%" (
    echo [错误] 回滚脚本不存在: %SQL_FILE%
    pause
    exit /b 1
)

%MYSQL_CMD% -D %DB_NAME% < "%SQL_FILE%"
if errorlevel 1 (
    echo [错误] 回滚执行失败!
    pause
    exit /b 1
)

echo.
echo ============================================================
echo    回滚执行成功!
echo ============================================================
echo.
echo 已删除表:
echo   - coupon          (优惠券主表)
echo   - user_coupon     (用户领券记录表)
echo.

pause
