import { AxiosResponse } from 'axios';
// import { RouteRecordRaw, RouteLocationRaw } from 'vue-router';
// import { RuleItem } from 'async-validator';

declare global {
  interface PromiseConstructor {
    allSettled<TAll>(values: Iterable<TAll | PromiseLike<TAll>>): Promise<{ status: 'fulfilled' | 'rejected'; value?: TAll; reason: any }[]>;
  }

  interface Obj<T = any> {
    [key: string]: T;
    [key: number]: T;
  }

  type XingrenEmun = [string, string, number];

  type TableResponse<T = any> = {
    page: number;
    size: number;
    total?: number;
    content: T[];
    hasNext?: boolean;
  }

  type XingrenResponse<T = any> = {
    success: boolean;
    data: T;
    errCode: number;
    errMessage: string;
    message?: string;
  }

  type HttpError = {
    errCode: number;
    errMessage: string;
    [key: string]: any;
  }

  type HttpResponse<T = any> = AxiosResponse<XingrenResponse<T>>;

  type HttpResponseP<T = any> = Promise<HttpResponse<T>>;

  type HttpTableResponse<T = any> = HttpResponse<TableResponse<T>>;

  type HttpTableResponseP<T = any> = Promise<HttpTableResponse<T>>;

  interface RouteMeta {
    [key: string]: any;
    title: string;
    hiddenMenu?: boolean; // 在菜单不显示，具有延续性
    abstract?: boolean; // 抽象路由，不能被激活，只能由子路由激活
    /**
     * 当只有一个子路由的时候，侧边栏会只显示子路由
     * 如果想一直在侧边栏显示父路由，则设置该属性为 true
     */
    alwaysShow?: boolean;
    permissions?: string[];
  }

  // type RouteConfig = RouteRecordRaw & {
  //   name: string;
  //   path: string;
  //   component?: any;
  //   children?: RouteConfig[];
  //   meta: RouteMeta;
  // };

  interface Menu {
    name: string;
    title: string;
    meta: RouteMeta;
    children?: Menu[];
    hasParent?: false;
  }

  // interface Breadcrumb {
  //   title: string;
  //   route?: RouteLocationRaw;
  // }

  interface PageQuery {
    page?: number;
    size?: number;
  }

  // interface FormRuleItem extends RuleItem {
  //   trigger?: keyof HTMLElementEventMap;
  // }

  // interface FormRules {
  //   [field: string]: FormRuleItem | FormRuleItem[];
  // }

}

export { };
