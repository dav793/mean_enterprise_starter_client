
export enum PermissionAction {
    CREATE      = 'create',
    READ        = 'read',
    UPDATE      = 'update',
    DELETE      = 'delete'
}

export enum PermissionLevel {
    DENY = 1,
    REQUEST_AUTHENTICATION,
    ALLOW
}
