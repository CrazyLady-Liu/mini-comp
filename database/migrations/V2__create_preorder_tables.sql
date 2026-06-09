-- ============================================================
-- 预售专区数据库建表脚本
-- 版本: V2
-- 描述: 创建预售活动主表和预售活动商品关联表
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------
-- 1. 预售活动主表 preorder_activity
-- -----------------------------------------------------------
DROP TABLE IF EXISTS `preorder_activity`;
CREATE TABLE `preorder_activity` (
  `id`                        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '活动ID',
  `name`                      VARCHAR(128)    NOT NULL                COMMENT '活动名称',
  `preorder_start_time`       DATETIME        NOT NULL                COMMENT '预售开始时间',
  `preorder_end_time`         DATETIME        NOT NULL                COMMENT '预售截止时间(截单时间)',
  `balance_start_time`        DATETIME        NOT NULL                COMMENT '尾款开始时间',
  `balance_end_time`          DATETIME        NOT NULL                COMMENT '尾款截止时间(超时未付自动取消)',
  `expected_delivery_date`    DATE            NOT NULL                COMMENT '预计发货日期(前台展示X月X日统一发货)',
  `deposit_amount`            DECIMAL(10,2)   NOT NULL DEFAULT 0.00   COMMENT '定金金额',
  `status`                    TINYINT         NOT NULL DEFAULT 0      COMMENT '活动状态 0-未开始 1-预售中 2-已截单 3-尾款中 4-活动结束',
  `description`               VARCHAR(512)    DEFAULT NULL            COMMENT '活动描述',
  `sort`                      INT             NOT NULL DEFAULT 0      COMMENT '排序权重(数值越大越靠前)',
  `created_at`                DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间',
  `updated_at`                DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '更新时间',
  `deleted_at`                DATETIME        DEFAULT NULL            COMMENT '删除时间(软删除)',
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_preorder_start_time` (`preorder_start_time`),
  KEY `idx_preorder_end_time` (`preorder_end_time`),
  KEY `idx_sort` (`sort`),
  KEY `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预售活动主表';

-- -----------------------------------------------------------
-- 2. 预售活动商品关联表 preorder_activity_product
-- -----------------------------------------------------------
DROP TABLE IF EXISTS `preorder_activity_product`;
CREATE TABLE `preorder_activity_product` (
  `id`                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `activity_id`       BIGINT UNSIGNED NOT NULL                COMMENT '活动ID',
  `product_id`        BIGINT UNSIGNED NOT NULL                COMMENT '商品ID',
  `product_name`      VARCHAR(128)    DEFAULT NULL            COMMENT '商品名称(冗余)',
  `product_image`     VARCHAR(256)    DEFAULT NULL            COMMENT '商品图片(冗余)',
  `spec_id`           BIGINT UNSIGNED DEFAULT NULL            COMMENT '规格ID(可选,空表示全规格参与)',
  `spec_name`         VARCHAR(64)     DEFAULT NULL            COMMENT '规格名称(冗余)',
  `preorder_price`    DECIMAL(10,2)   NOT NULL                COMMENT '预售价格',
  `original_price`    DECIMAL(10,2)   DEFAULT NULL            COMMENT '原价',
  `preorder_stock`    INT             NOT NULL DEFAULT 0      COMMENT '预售库存数量',
  `sold_count`        INT             NOT NULL DEFAULT 0      COMMENT '已售数量',
  `sort`              INT             NOT NULL DEFAULT 0      COMMENT '商品排序(活动内排序)',
  `created_at`        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间',
  `updated_at`        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_activity_id` (`activity_id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_activity_product` (`activity_id`, `product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预售活动商品关联表';

SET FOREIGN_KEY_CHECKS = 1;
