import { FC, Fragment, PropsWithChildren, ReactNode, useMemo } from "react";
import { useSession } from "../providers/session";

type TProps = PropsWithChildren<{
  permissions: Array<string>;
  fallback?: ReactNode;
}>;

export const Guard: FC<TProps> = (props): ReactNode => {
  const { session } = useSession();

  const permissionKeys = useMemo(() => {
    return session?.user?.role?.permissions.map((perm) => perm.name) || [];
  }, [session?.user?.role]);

  const allowed = useMemo(() => {
    return props.permissions.every((permission) => permissionKeys.includes(permission));
  }, [permissionKeys, props.permissions]);

  if (allowed) {
    return <Fragment>{props.children}</Fragment>;
  }

  return props.fallback ?? null;
};
