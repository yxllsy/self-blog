// src/types/archive.ts
/** 单篇文章的简化信息（归档列表中展示用） */
export interface ArchiveArticle {
    id: string | number;
    title: string;
    createTime: string; // 格式："2025-10-23"
    categoryName: string; // 所属分类名称
    url: string; // 文章详情页路由（如 "/article/123"）
    summary: string;
}

/** 月度归档分组（年份下的子项） */
export interface MonthArchive {
    month: number; // 月份（1-12）
    articleCount: number; // 该月文章数量
    articles: ArchiveArticle[]; // 该月文章列表
}

/** 年份归档分组（顶层） */
export interface YearArchive {
    year: number; // 年份（如 2025）
    totalCount: number; // 该年总文章数
    months: MonthArchive[]; // 该年下的月度归档
    isExpanded: boolean; // 是否展开该年份（UI 状态）
}

/** 分类归档分组 */
export interface CategoryArchive {
    id: string | number; // 分类 ID
    name: string; // 分类名称
    articleCount: number; // 该分类文章数量
    url: string; // 分类归档页路由（如 "/archive/category/frontend"）
}
