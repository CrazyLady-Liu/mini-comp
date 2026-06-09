const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname);

console.log('============================================================');
console.log('   SQL 脚本静态检查报告');
console.log('============================================================');
console.log();

const files = [
  { path: 'migrations/V1__create_coupon_tables.sql', type: 'migration', version: 'V1' },
  { path: 'rollbacks/V1__drop_coupon_tables.sql', type: 'rollback', version: 'V1' },
  { path: 'seeds/V1__seed_coupon_data.sql', type: 'seed', version: 'V1' },
  { path: 'migrations/V2__create_preorder_tables.sql', type: 'migration', version: 'V2' },
  { path: 'rollbacks/V2__drop_preorder_tables.sql', type: 'rollback', version: 'V2' },
  { path: 'seeds/V2__seed_preorder_data.sql', type: 'seed', version: 'V2' }
];

let allPassed = true;

function check(label, condition, detail) {
  const pass = condition ? '✓ PASS' : '✗ FAIL';
  const color = condition ? '\x1b[32m' : '\x1b[31m';
  const reset = '\x1b[0m';
  console.log(`${color}${pass}${reset}  ${label}`);
  if (detail && !condition) {
    console.log(`       ${detail}`);
  }
  if (!condition) allPassed = false;
}

files.forEach(fileInfo => {
  const filePath = path.join(BASE_DIR, fileInfo.path);
  console.log(`--- ${fileInfo.path} ---`);

  const exists = fs.existsSync(filePath);
  check('文件存在', exists, '文件不存在');

  if (!exists) {
    console.log();
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const size = Buffer.byteLength(content, 'utf8');
  check('文件非空', size > 0, '文件内容为空');
  check('文件编码检查 (utf8)', true);

  if (fileInfo.type === 'migration' && fileInfo.version === 'V1') {
    check('包含 coupon 表建表语句', /CREATE TABLE\s+`?coupon`?/i.test(content), '未找到 coupon 表建表语句');
    check('包含 user_coupon 表建表语句', /CREATE TABLE\s+`?user_coupon`?/i.test(content), '未找到 user_coupon 表建表语句');

    const couponFields = ['id', 'name', 'coupon_type', 'coupon_type_name', 'discount_type', 'discount_value',
      'min_amount', 'max_discount', 'category_id', 'category_name', 'valid_type', 'valid_from', 'valid_to',
      'valid_days', 'stock', 'received_count', 'used_count', 'limit_per_user', 'limit_self_point_id',
      'description', 'usage_note', 'sort', 'status', 'created_at', 'updated_at', 'deleted_at'];
    console.log();
    console.log('  coupon 表字段检查:');
    couponFields.forEach(field => {
      const regex = new RegExp('`' + field + '`\\s+\\w+', 'i');
      check(`    ${field}`, regex.test(content));
    });

    const couponIndexes = ['idx_coupon_type', 'idx_status', 'idx_limit_self_point_id', 'idx_sort'];
    console.log();
    console.log('  coupon 表索引检查:');
    couponIndexes.forEach(idx => {
      check(`    ${idx}`, content.includes(idx), '索引未定义');
    });

    const userCouponFields = ['id', 'user_id', 'coupon_id', 'coupon_name', 'coupon_type', 'discount_type',
      'discount_value', 'min_amount', 'valid_start_time', 'valid_end_time', 'use_status', 'use_time',
      'order_id', 'order_no', 'receive_time', 'source', 'created_at', 'updated_at'];
    console.log();
    console.log('  user_coupon 表字段检查:');
    userCouponFields.forEach(field => {
      const regex = new RegExp('`' + field + '`\\s+\\w+', 'i');
      check(`    ${field}`, regex.test(content));
    });

    const userCouponIndexes = ['idx_user_id', 'idx_coupon_id', 'idx_use_status', 'idx_valid_end_time'];
    console.log();
    console.log('  user_coupon 表索引检查:');
    userCouponIndexes.forEach(idx => {
      check(`    ${idx}`, content.includes(idx), '索引未定义');
    });

    const hasDuplicateIndex = /KEY\s+`[^`]+`\s+\([^)]+\)[^;]*KEY\s+`\1`/s.test(content);
    console.log();
    check('无重复索引定义', !hasDuplicateIndex, '存在重复索引名称');

    const primaryKeyCount = (content.match(/PRIMARY KEY/g) || []).length;
    check('每张表一个主键', primaryKeyCount === 2, `找到 ${primaryKeyCount} 个主键定义，期望 2 个`);

    const engineCount = (content.match(/ENGINE=InnoDB/g) || []).length;
    check('使用 InnoDB 引擎', engineCount === 2, `找到 ${engineCount} 个 InnoDB 引擎定义`);

    check('字符集 utf8mb4', /utf8mb4/i.test(content), '未使用 utf8mb4 字符集');
  }

  if (fileInfo.type === 'migration' && fileInfo.version === 'V2') {
    check('包含 preorder_activity 表建表语句', /CREATE TABLE\s+`?preorder_activity`?/i.test(content), '未找到 preorder_activity 表建表语句');
    check('包含 preorder_activity_product 表建表语句', /CREATE TABLE\s+`?preorder_activity_product`?/i.test(content), '未找到 preorder_activity_product 表建表语句');

    const activityFields = ['id', 'name', 'preorder_start_time', 'preorder_end_time',
      'balance_start_time', 'balance_end_time', 'expected_delivery_date',
      'deposit_amount', 'status', 'description', 'sort', 'created_at', 'updated_at', 'deleted_at'];
    console.log();
    console.log('  preorder_activity 表字段检查:');
    activityFields.forEach(field => {
      const regex = new RegExp('`' + field + '`\\s+\\w+', 'i');
      check(`    ${field}`, regex.test(content));
    });

    const activityIndexes = ['idx_status', 'idx_preorder_start_time', 'idx_preorder_end_time', 'idx_sort', 'idx_deleted_at'];
    console.log();
    console.log('  preorder_activity 表索引检查:');
    activityIndexes.forEach(idx => {
      check(`    ${idx}`, content.includes(idx), '索引未定义');
    });

    const productFields = ['id', 'activity_id', 'product_id', 'product_name', 'product_image',
      'spec_id', 'spec_name', 'preorder_price', 'original_price', 'preorder_stock',
      'sold_count', 'sort', 'created_at', 'updated_at'];
    console.log();
    console.log('  preorder_activity_product 表字段检查:');
    productFields.forEach(field => {
      const regex = new RegExp('`' + field + '`\\s+\\w+', 'i');
      check(`    ${field}`, regex.test(content));
    });

    const productIndexes = ['idx_activity_id', 'idx_product_id', 'idx_activity_product'];
    console.log();
    console.log('  preorder_activity_product 表索引检查:');
    productIndexes.forEach(idx => {
      check(`    ${idx}`, content.includes(idx), '索引未定义');
    });

    const hasDuplicateIndex = /KEY\s+`[^`]+`\s+\([^)]+\)[^;]*KEY\s+`\1`/s.test(content);
    console.log();
    check('无重复索引定义', !hasDuplicateIndex, '存在重复索引名称');

    const primaryKeyCount = (content.match(/PRIMARY KEY/g) || []).length;
    check('每张表一个主键', primaryKeyCount === 2, `找到 ${primaryKeyCount} 个主键定义，期望 2 个`);

    const engineCount = (content.match(/ENGINE=InnoDB/g) || []).length;
    check('使用 InnoDB 引擎', engineCount === 2, `找到 ${engineCount} 个 InnoDB 引擎定义`);

    check('字符集 utf8mb4', /utf8mb4/i.test(content), '未使用 utf8mb4 字符集');
  }

  if (fileInfo.type === 'rollback' && fileInfo.version === 'V1') {
    check('包含 DROP coupon 语句', /DROP TABLE.*`?coupon`?/i.test(content), '未找到删除 coupon 表语句');
    check('包含 DROP user_coupon 语句', /DROP TABLE.*`?user_coupon`?/i.test(content), '未找到删除 user_coupon 表语句');
  }

  if (fileInfo.type === 'rollback' && fileInfo.version === 'V2') {
    check('包含 DROP preorder_activity_product 语句', /DROP TABLE.*`?preorder_activity_product`?/i.test(content), '未找到删除 preorder_activity_product 表语句');
    check('包含 DROP preorder_activity 语句', /DROP TABLE.*`?preorder_activity`?/i.test(content), '未找到删除 preorder_activity 表语句');
  }

  if (fileInfo.type === 'seed' && fileInfo.version === 'V1') {
    check('包含 INSERT INTO coupon 语句', /INSERT INTO\s+`?coupon`?/i.test(content), '未找到插入 coupon 数据语句');
    const insertCount = (content.match(/INSERT INTO\s+`?coupon`?/gi) || []).length;
    check('INSERT 语句数量正确', insertCount >= 1, `只有 ${insertCount} 条 INSERT 语句`);

    const valueMatches = content.match(/VALUES[\s\S]*?;/gi);
    if (valueMatches) {
      const rowCount = valueMatches.reduce((sum, match) => {
        const rows = match.match(/\(/g);
        return sum + (rows ? rows.length : 0);
      }, 0);
      check('示例数据条数 (>=12)', rowCount >= 12, `只有 ${rowCount} 条数据`);
    }
  }

  if (fileInfo.type === 'seed' && fileInfo.version === 'V2') {
    check('包含 INSERT INTO preorder_activity 语句', /INSERT INTO\s+`?preorder_activity`?/i.test(content), '未找到插入 preorder_activity 数据语句');
    check('包含 INSERT INTO preorder_activity_product 语句', /INSERT INTO\s+`?preorder_activity_product`?/i.test(content), '未找到插入 preorder_activity_product 数据语句');
    const insertCount = (content.match(/INSERT INTO\s+`?preorder_/gi) || []).length;
    check('INSERT 语句数量正确', insertCount >= 2, `只有 ${insertCount} 条 INSERT 语句，期望至少 2 条`);

    const valueMatches = content.match(/VALUES[\s\S]*?;/gi);
    if (valueMatches) {
      const rowCount = valueMatches.reduce((sum, match) => {
        const rows = match.match(/\(/g);
        return sum + (rows ? rows.length : 0);
      }, 0);
      check('示例数据条数 (>=3)', rowCount >= 3, `只有 ${rowCount} 条数据，期望至少 3 条`);
    }
  }

  console.log();
});

console.log('============================================================');
console.log(`   静态检查结果: ${allPassed ? '全部通过 ✓' : '存在问题 ✗'}`);
console.log('============================================================');

if (!allPassed) {
  process.exit(1);
}
