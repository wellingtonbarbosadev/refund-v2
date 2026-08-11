type UserAPIRole = "employee" | "manager";

type UserAPIResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserAPIRole;
  };
};
