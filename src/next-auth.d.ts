//declaring inside user which is in next-auth module

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: StaticRange;
  }
}

export {};
