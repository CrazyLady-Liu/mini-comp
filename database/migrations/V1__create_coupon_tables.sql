-- ============================================================
-- 领券中心数据库建表脚本
-- 版本: V1
-- 描述: 创建优惠券主表和用户领券记录表
-- ============================================================

-- 设置字符集
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------
-- 1. 优惠券主表 coupon
-- -----------------------------------------------------------
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE `coupon` (
  `id`                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '优惠券ID',
  `name`                  VARCHAR(128)    NOT NULL                COMMENT '优惠券名称',
  `coupon_type`           TINYINT         NOT NULL                COMMENT '优惠券类型 1-满减券 2-品类券 3-无门槛券 4-预售券 5-自提券',
  `coupon_type_name`      VARCHAR(32)     DEFAULT NULL            COMMENT '优惠券类型名称',
  `discount_type`         TINYINT         NOT NULL DEFAULT 1      COMMENT '折扣类型 1-金额 2-折扣',
  `discount_value`        DECIMAL(10,2)   NOT NULL                COMMENT '折扣值(金额:元 折扣:折)',
  `min_amount`            DECIMAL(10,2)   NOT NULL DEFAULT 0.00   COMMENT '最低使用金额(0表示无门槛)',
  `max_discount`          DECIMAL(10,2)   DEFAULT NULL            COMMENT '最大折扣金额(折扣券使用)',
  `category_id`           BIGINT UNSIGNED DEFAULT NULL            COMMENT '品类ID',
  `category_name`         VARCHAR(64)     DEFAULT NULL            COMMENT '品类名称',
  `valid_type`            TINYINT         NOT NULL DEFAULT 1      COMMENT '有效期类型 1-固定时间 2-领取后N天有效',
  `valid_from`            DATETIME        DEFAULT NULL            COMMENT '有效期开始时间',
  `valid_to`              DATETIME        DEFAULT NULL            COMMENT '有效期结束时间',
  `valid_days`            INT             DEFAULT NULL            COMMENT '领取后有效天数',
  `stock`                 INT             NOT NULL DEFAULT 0      COMMENT '库存数量',
  `received_count`        INT             NOT NULL DEFAULT 0      COMMENT '已领取数量',
  `used_count`            INT             NOT NULL DEFAULT 0      COMMENT '已使用数量',
  `limit_per_user`        INT             NOT NULL DEFAULT 1      COMMENT '每人限领数量',
  `limit_self_point_id`   BIGINT UNSIGNED DEFAULT NULL            COMMENT '限制自提点ID(NULL表示全部自提点可用)',
  `description`           VARCHAR(512)    DEFAULT NULL            COMMENT '优惠券描述',
  `usage_note`            VARCHAR(512)    DEFAULT NULL            COMMENT '使用说明',
  `sort`                  INT             NOT NULL DEFAULT 0      COMMENT '排序值(数值越大越靠前)',
  `status`                TINYINT         NOT NULL DEFAULT 1      COMMENT '状态 0-草稿 1-上架(进行中) 2-已下架 3-已结束',
  `created_at`            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间',
  `updated_at`            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '更新时间',
  `deleted_at`            DATETIME        DEFAULT NULL            COMMENT '删除时间(软删除)',
  PRIMARY KEY (`id`),
  KEY `idx_coupon_type` (`coupon_type`),
  KEY `idx_status` (`status`),
  KEY `idx_limit_self_point_id` (`limit_self_point_id`),
  KEY `idx_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券主表';

-- -----------------------------------------------------------
-- 2. 用户领券记录表 user_coupon
-- -----------------------------------------------------------
DROP TABLE IF EXISTS `user_coupon`;
CREATE TABLE `user_coupon` (
  `id`                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `user_id`               BIGINT UNSIGNED NOT NULL                COMMENT '用户ID',
  `coupon_id`             BIGINT UNSIGNED NOT NULL                COMMENT '优惠券ID',
  `coupon_name`           VARCHAR(128)    DEFAULT NULL            COMMENT '优惠券名称(冗余字段)',
  `coupon_type`           TINYINT         DEFAULT NULL            COMMENT '优惠券类型(冗余字段)',
  `discount_type`         TINYINT         DEFAULT NULL            COMMENT '折扣类型(冗余字段)',
  `discount_value`        DECIMAL(10,2)   DEFAULT NULL            COMMENT '折扣值(冗余字段)',
  `min_amount`            DECIMAL(10,2)   DEFAULT NULL            COMMENT '最低使用金额(冗余字段)',
  `valid_start_time`      DATETIME        NOT NULL                COMMENT '生效开始时间',
  `valid_end_time`        DATETIME        NOT NULL                COMMENT '生效结束时间',
  `use_status`            TINYINT         NOT NULL DEFAULT 0      COMMENT '使用状态 0-未使用 1-已使用 2-已过期',
  `use_time`              DATETIME        DEFAULT NULL            COMMENT '使用时间',
  `order_id`              BIGINT UNSIGNED DEFAULT NULL            COMMENT '使用订单ID',
  `order_no`              VARCHAR(64)     DEFAULT NULL            COMMENT '使用订单号',
  `receive_time`          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '领取时间',
  `source`                TINYINT         NOT NULL DEFAULT 1      COMMENT '来源 1-主动领取 2-活动发放 3-新人礼包 4-积分兑换',
  `created_at`            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间',
  `updated_at`            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_coupon_id` (`coupon_id`),
  KEY `idx_use_status` (`use_status`),
  KEY `idx_valid_end_time` (`valid_end_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户领券记录表';

SET FOREIGN_KEY_CHECKS = 1;
