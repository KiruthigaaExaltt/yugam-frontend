/**
 * Common query parameters interface for paginated and filtered API requests.
 */
export interface CommonQueryParams {
    page?: number;
    limit?: number;
    deleted?: string;
    keyword?: string;
    sortStatus?: string;
    status?: string;
}

/**
 * Formats query parameters with default values and ensures consistent naming.
 * Specifically handles the common 'deleted/status', 'page', 'limit', and 'keyword' pattern.
 */
export const formatQueryParams = (params: CommonQueryParams | void) => {
    return {
        page: params?.page || 1,
        limit: params?.limit || 10,
        deleted: params?.deleted || params?.status || "notdeleted",
        keyword: params?.keyword || undefined,
        sortStatus: params?.sortStatus || undefined,
    };
};
