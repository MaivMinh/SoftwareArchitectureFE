export interface IRoute {
  exact?: boolean;
  path: string;
  name: string;
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  component?: React.ElementType;
  role?: IRole[];
  children: string[];
}
export interface IRole {
  name: string;
}
