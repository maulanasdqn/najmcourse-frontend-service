import { hasCommonElements } from "./has-common-element";

type TPermissionChecker = {
  permissions: Array<string>;
  userPermissions?: Array<string>;
  customCondition?: boolean;
};

/**
 * Checks if the user has the required permissions and meets a custom condition.
 *
 * @param {Object} params - The parameters for the permission check.
 * @param {string[]} params.permissions - The required permissions.
 * @param {string[]} params.userPermissions - The user's permissions.
 * @param {boolean} [params.customCondition=true] - An optional custom condition that must also be met.
 * @returns {boolean} - Returns `true` if the user has the required permissions and meets the custom condition, otherwise `false`.
 *
 * @example
 * const permissions = ['read', 'write'];
 * const userPermissions = ['read', 'delete'];
 * const customCondition = true;
 * const hasAccess = checkPermission({ permissions, userPermissions, customCondition });
 */
export const checkPermission = ({
  permissions,
  userPermissions,
  customCondition = true,
}: TPermissionChecker): boolean => {
  if (!userPermissions) return false;
  const hasPermission = hasCommonElements(permissions, userPermissions);
  return hasPermission && customCondition;
};

type Permission = Record<string, unknown>;

type PermissionWithChildren = Permission & {
  children: (PermissionWithChildren | Permission)[];
};

const isPermissionWithChildren = (
  permission: PermissionWithChildren | Permission,
): permission is PermissionWithChildren => {
  return "children" in permission;
};

export const filterPermission = <T extends PermissionWithChildren | Permission>(
  menus: T[],
  hasPermissionCB: (menu: T) => boolean,
): T[] => {
  return menus.reduce((all, menu) => {
    if (isPermissionWithChildren(menu) && menu.children.length > 0) {
      const children = filterPermission(menu.children as T[], hasPermissionCB);
      if (children.length > 0) {
        const currentPermission = menu;
        currentPermission.children = children;
        all.push(currentPermission);
      }
    } else if (hasPermissionCB(menu)) {
      all.push(menu);
    }
    return all;
  }, [] as T[]);
};
