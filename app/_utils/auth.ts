export const getBearerConfig = (user: any) => {
    return {
        headers: { Authorization: `Bearer ${user?.access_token}` }
    }
}