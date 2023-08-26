export const ROLES = {
    ani_admin: "KA",
    org_admin: "OA",
    org_coordinator: "OC",
}

export const SEED_KA = {
    email: "ani-donation@otaku.com",
    password: "anidonator@123",
    name: "The Truth",
    role: ROLES.ani_admin
}

export const ROUTES = {
    login: '/login',
    aniAdmin: {
        base: "/aniAdmin",
        org: "/aniAdmin/org",
        user: "/aniAdmin/user",
    },
    orgAdmin: "/orgAdmin",
    orgCoordinator: "/orgCoordinator"
}