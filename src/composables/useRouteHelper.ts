import {
    useRouter,
    useRoute,
    RouteLocationAsPath,
    RouteLocationAsRelative
} from 'vue-router';

type RouteQuery = Record<string | number, string | number | boolean | undefined | (string | number | boolean | undefined)[]>;
type RouteParams = Record<string, string | number | boolean | undefined>;

export function useRouteHelper() {
    const router = useRouter();
    const route = useRoute();

    // -------------------------- 修正后的方法（类型兼容 4.4+） --------------------------
    const redirectTo = (
        path: string | RouteLocationAsPath | RouteLocationAsRelative
    ) => {
        router.push(path);
    };

    const redirectWithParams = (
        path: string,
        query?: any // 使用自定义兼容类型
    ) => {
        router.push({
            path,
            query
        });
    };

    const pushWithQuery = (
        path: string,
        query: any,
        replace = false
    ) => {
        const mergedQuery = { ...(route.query as RouteQuery), ...query };
        const navigationOptions = { path, query: mergedQuery };
        replace ? router.replace(navigationOptions) : router.push(navigationOptions);
    };

    const pushWithParams = (
        name: string,
        params: any,
        replace = false
    ) => {
        const mergedParams = { ...(route.params as RouteParams), ...params };
        const navigationOptions = { name, params: mergedParams };
        replace ? router.replace(navigationOptions) : router.push(navigationOptions);
    };

    const buildPath = (
        basePath: string = '',
        segments: (string | number | undefined)[] = []
    ) => {
        const validSegments = segments.filter(
            (segment): segment is string | number => segment !== undefined && segment !== ''
        );

        const fullPath = [basePath, ...validSegments]
            .join('/')
            .replace(/\/+/g, '/')
            .replace(/^([^/])/, '/$1');

        return fullPath;
    };

    const getQueryParam = <T = string>(key?: string): T | RouteQuery => {
        const query = route.query as RouteQuery; // 类型断言，兼容 4.4+
        if (key) {
            return (query[key] as unknown) as T;
        }
        return query;
    };

    const getParamsParam = <T = string>(key?: string): T | RouteParams => {
        const params = route.params as RouteParams; // 类型断言，兼容 4.4+
        if (key) {
            return (params[key] as unknown) as T;
        }
        return params;
    };

    const generateFullUrl = (
        path: string,
        options: { query?: any; params?: any } = {}
    ) => {
        const { query = {}, params = {} } = options;
        const location = typeof path === 'string'
            ? { path, query, params }
            : { name: path, query, params };
        const resolved = router.resolve(location);
        return resolved.href;
    };

    return {
        redirectTo,
        redirectWithParams,
        pushWithQuery,
        pushWithParams,
        buildPath,
        getQueryParam,
        getParamsParam,
        generateFullUrl,
    };
}
