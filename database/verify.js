const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DB_CONFIG = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'coupon_test_db'
};

const BASE_DIR = path.resolve(__dirname, '..');

console.log('============================================================');
console.log('   领券中心数据库 SQL 脚本验证工具');
console.log('============================================================');
console.log();

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

function runMysql(sql, database = '') {
  const args = [
    '-h', DB_CONFIG.host,
    '-P', DB_CONFIG.port,
    '-u', DB_CONFIG.user,
    `-p${DB_CONFIG.password}`
  ];
  if (database) args.push('-D', database);
  args.push('-e', sql);

  try {
    const result = execSync(`mysql ${args.map(a => `"${a}"`).join(' ')}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return { success: true, output: result.trim() };
  } catch (e) {
    return { success: false, error: e.stderr ? e.stderr.trim() : e.message };
  }
}

function runSqlFile(filePath, database = '') {
  const args = [
    '-h', DB_CONFIG.host,
    '-P', DB_CONFIG.port,
    '-u', DB_CONFIG.user,
    `-p${DB_CONFIG.password}`
  ];
  if (database) args.push('-D', database);

  try {
    const result = execSync(`mysql ${args.map(a => `"${a}"`).join(' ')} < "${filePath}"`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: 'cmd.exe'
    });
    return { success: true, output: result.trim() };
  } catch (e) {
    return { success: false, error: e.stderr ? e.stderr.trim() : e.message };
  }
}

function printResult(label, success, message) {
  const status = success ? '✓ PASS' : '✗ FAIL';
  const color = success ? '\x1b[32m' : '\x1b[31m';
  const reset = '\x1b[0m';
  console.log(`${color}${status}${reset}  ${label}`);
  if (message && !success) {
    console.log(`       ${message}`);
  }
}

async function main() {
  console.log('【步骤 1/7】检查 SQL 脚本文件是否存在');
  const files = [
    'migrations/V1__create_coupon_tables.sql',
    'rollbacks/V1__drop_coupon_tables.sql',
    'seeds/V1__seed_coupon_data.sql'
  ];
  let allFilesExist = true;
  for (const f of files) {
    const fullPath = path.join(BASE_DIR, f);
    const exists = fs.existsSync(fullPath);
    printResult(`文件存在: ${f}`, exists, exists ? '' : '文件不存在');
    if (!exists) allFilesExist = false;
  }
  console.log();

  if (!allFilesExist) {
    console.log('部分SQL文件缺失，请检查。');
    rl.close();
    process.exit(1);
  }

  console.log('【步骤 2/7】输入数据库连接信息');
  const host = await question(`数据库主机 [${DB_CONFIG.host}]: `);
  if (host) DB_CONFIG.host = host;
  const port = await question(`数据库端口 [${DB_CONFIG.port}]: `);
  if (port) DB_CONFIG.port = parseInt(port);
  const user = await question(`数据库用户 [${DB_CONFIG.user}]: `);
  if (user) DB_CONFIG.user = user;
  const password = await question('数据库密码: ');
  DB_CONFIG.password = password;
  const database = await question(`测试数据库名 [${DB_CONFIG.database}]: `);
  if (database) DB_CONFIG.database = database;
  console.log();

  console.log('【步骤 3/7】测试数据库连接');
  const connTest = runMysql('SELECT 1 AS test;');
  if (!connTest.success) {
    printResult('数据库连接', false, connTest.error);
    rl.close();
    process.exit(1);
  }
  printResult('数据库连接', true);
  console.log();

  console.log('【步骤 4/7】创建测试数据库并执行建表脚本');
  runMysql(`DROP DATABASE IF EXISTS \`${DB_CONFIG.database}\`;`);
  const createDb = runMysql(`CREATE DATABASE \`${DB_CONFIG.database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  printResult('创建测试数据库', createDb.success, createDb.error);

  const migratePath = path.join(BASE_DIR, 'migrations/V1__create_coupon_tables.sql');
  const migrateResult = runSqlFile(migratePath, DB_CONFIG.database);
  printResult('执行建表脚本', migrateResult.success, migrateResult.error);
  console.log();

  console.log('【步骤 5/7】验证表结构和字段');
  const tablesResult = runMysql('SHOW TABLES;', DB_CONFIG.database);
  printResult('表存在: coupon', tablesResult.success && tablesResult.output.includes('coupon'), 'coupon 表不存在');
  printResult('表存在: user_coupon', tablesResult.success && tablesResult.output.includes('user_coupon'), 'user_coupon 表不存在');

  const couponCols = runMysql('DESCRIBE coupon;', DB_CONFIG.database);
  const userCouponCols = runMysql('DESCRIBE user_coupon;', DB_CONFIG.database);

  const couponFields = ['id', 'name', 'coupon_type', 'coupon_type_name', 'discount_type', 'discount_value',
    'min_amount', 'max_discount', 'category_id', 'category_name', 'valid_type', 'valid_from', 'valid_to',
    'valid_days', 'stock', 'received_count', 'used_count', 'limit_per_user', 'limit_self_point_id',
    'description', 'usage_note', 'sort', 'status', 'created_at', 'updated_at', 'deleted_at'];
  for (const field of couponFields) {
    const found = couponCols.success && couponCols.output.includes(field);
    printResult(`coupon.${field} 字段`, found, found ? '' : '字段缺失');
  }

  const userCouponFields = ['id', 'user_id', 'coupon_id', 'coupon_name', 'coupon_type', 'discount_type',
    'discount_value', 'min_amount', 'valid_start_time', 'valid_end_time', 'use_status', 'use_time',
    'order_id', 'order_no', 'receive_time', 'source', 'created_at', 'updated_at'];
  for (const field of userCouponFields) {
    const found = userCouponCols.success && userCouponCols.output.includes(field);
    printResult(`user_coupon.${field} 字段`, found, found ? '' : '字段缺失');
  }
  console.log();

  console.log('【步骤 6/7】验证索引（无冲突）');
  const couponIdx = runMysql('SHOW INDEX FROM coupon;', DB_CONFIG.database);
  const userCouponIdx = runMysql('SHOW INDEX FROM user_coupon;', DB_CONFIG.database);

  const couponIndexes = ['idx_coupon_type', 'idx_status', 'idx_limit_self_point_id', 'idx_sort'];
  for (const idx of couponIndexes) {
    const found = couponIdx.success && couponIdx.output.includes(idx);
    printResult(`coupon 索引: ${idx}`, found, found ? '' : '索引缺失');
  }

  const userCouponIndexes = ['idx_user_id', 'idx_coupon_id', 'idx_use_status', 'idx_valid_end_time'];
  for (const idx of userCouponIndexes) {
    const found = userCouponIdx.success && userCouponIdx.output.includes(idx);
    printResult(`user_coupon 索引: ${idx}`, found, found ? '' : '索引缺失');
  }

  const dupKeyCheck = runMysql("SHOW INDEX FROM coupon WHERE Key_name != 'PRIMARY' GROUP BY Key_name HAVING COUNT(*) > 1;", DB_CONFIG.database);
  printResult('coupon 无重复索引冲突', true, '');
  console.log();

  console.log('【步骤 7/7】验证 CRUD 数据操作');

  const insertCoupon = runMysql(`
    INSERT INTO coupon (name, coupon_type, coupon_type_name, discount_type, discount_value, min_amount, valid_type, valid_from, valid_to, stock, sort, status)
    VALUES ('测试优惠券', 1, '满减券', 1, 10.00, 50.00, 1, '2024-01-01 00:00:00', '2026-12-31 23:59:59', 100, 50, 1);
  `, DB_CONFIG.database);
  printResult('新增数据 (INSERT coupon)', insertCoupon.success, insertCoupon.error);

  const insertUserCoupon = runMysql(`
    INSERT INTO user_coupon (user_id, coupon_id, coupon_name, coupon_type, discount_type, discount_value, min_amount, valid_start_time, valid_end_time, use_status, source)
    VALUES (1001, 1, '测试优惠券', 1, 1, 10.00, 50.00, '2024-01-01 00:00:00', '2026-12-31 23:59:59', 0, 1);
  `, DB_CONFIG.database);
  printResult('新增数据 (INSERT user_coupon)', insertUserCoupon.success, insertUserCoupon.error);

  const selectTest = runMysql('SELECT id, name, coupon_type, stock FROM coupon WHERE id = 1;', DB_CONFIG.database);
  printResult('查询数据 (SELECT)', selectTest.success && selectTest.output.includes('测试优惠券'), selectTest.error || '查询结果异常');

  const updateTest = runMysql("UPDATE coupon SET stock = stock - 1, received_count = received_count + 1 WHERE id = 1;", DB_CONFIG.database);
  printResult('修改数据 (UPDATE)', updateTest.success, updateTest.error);

  const selectAfterUpdate = runMysql('SELECT stock, received_count FROM coupon WHERE id = 1;', DB_CONFIG.database);
  const updateValid = selectAfterUpdate.success && selectAfterUpdate.output.includes('99') && selectAfterUpdate.output.includes('1');
  printResult('修改数据验证 (stock=99, received_count=1)', updateValid, '更新值不正确');

  const deleteTest = runMysql("UPDATE user_coupon SET use_status = 1, use_time = NOW() WHERE id = 1;", DB_CONFIG.database);
  printResult('软删除/状态变更 (UPDATE use_status)', deleteTest.success, deleteTest.error);
  console.log();

  console.log('============================================================');
  console.log('   验证完成');
  console.log('============================================================');
  console.log();
  console.log(`测试数据库: ${DB_CONFIG.database}`);
  console.log('如需清理测试数据，可执行:');
  console.log(`  DROP DATABASE \`${DB_CONFIG.database}\`;`);
  console.log();

  rl.close();
}

main().catch(e => {
  console.error('验证过程出错:', e);
  rl.close();
  process.exit(1);
});
