import { TResponseData } from "@/commons/types/response";
import {
  TGetUsersParams,
  TUserUpdateRequest,
  TUserDetailResponse,
  TUserCreateRequest,
  TUserPaginateResponse,
} from "./type";

export const getUsers = (params: TGetUsersParams): Promise<TUserPaginateResponse> => {
  console.log(params);
  return Promise.resolve({
    data: {
      items: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "123-456-7890",
          address: "123 Main St, Anytown, USA",
          is_active: true,
          created_at: "2023-01-01T00:00:00.000Z",
          updated_at: "2023-01-01T00:00:00.000Z",
          roles: [
            {
              id: "1",
              key: "admin",
              name: "Admin",
              description: "Administrator role",
              created_at: "2023-01-01T00:00:00.000Z",
              updated_at: "2023-01-01T00:00:00.000Z",
              permissions: [
                {
                  id: "1",
                  key: "read",
                  name: "read",
                  description: "Read permission",
                  created_at: "2023-01-01T00:00:00.000Z",
                  updated_at: "2023-01-01T00:00:00.000Z",
                },
                {
                  id: "2",
                  key: "write",
                  name: "write",
                  description: "Write permission",
                  created_at: "2023-01-01T00:00:00.000Z",
                  updated_at: "2023-01-01T00:00:00.000Z",
                },
              ],
            },
          ],
        },
      ],
      meta: {
        page: 1,
        per_page: 10,
        total: 0,
        total_page: 0,
      },
    },
    status_code: 200,
    version: "1.0.0",
  });
};

export const getUser = (id: string): Promise<TUserDetailResponse> => {
  console.log(id);
  return Promise.resolve({
    data: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown, USA",
      is_active: true,
      created_at: "2023-01-01T00:00:00.000Z",
      updated_at: "2023-01-01T00:00:00.000Z",
      roles: [
        {
          id: "1",
          key: "admin",
          name: "Admin",
          description: "Administrator role",
          created_at: "2023-01-01T00:00:00.000Z",
          updated_at: "2023-01-01T00:00:00.000Z",
          permissions: [
            {
              id: "1",
              key: "read",
              name: "read",
              description: "Read permission",
              created_at: "2023-01-01T00:00:00.000Z",
              updated_at: "2023-01-01T00:00:00.000Z",
            },
            {
              id: "2",
              key: "write",
              name: "write",
              description: "Write permission",
              created_at: "2023-01-01T00:00:00.000Z",
              updated_at: "2023-01-01T00:00:00.000Z",
            },
          ],
        },
      ],
    },
    status_code: 200,
    version: "1.0.0",
  });
};

export const createUser = (data: TUserCreateRequest): Promise<TResponseData<null>> => {
  console.log(data);
  if (!data.name.includes("bagus")) {
    throw {
      status_code: 400,
      error_message: "Validation failed",
      stack_trace: "Validation failed",
      errors: [
        {
          key: "fullname",
          message: "Name harus mangandung 'bagus'",
        },
        {
          key: "email",
          message: "Email harus DOT",
        },
      ],
      version: "test",
    };
  }
  return Promise.resolve({
    data: null,
    status_code: 200,
    version: "1.0.0",
  });
};

export const updateUser = (id: string, data: TUserUpdateRequest): Promise<TResponseData<null>> => {
  console.log(id, data);
  return Promise.resolve({
    data: null,
    status_code: 200,
    version: "1.0.0",
  });
};

export const deleteUser = (id: string): Promise<TResponseData<null>> => {
  console.log(id);
  return Promise.resolve({
    data: null,
    status_code: 200,
    version: "1.0.0",
  });
};
