import { Request, Response } from "express";

export const getUsers = (request: Request, response: Response) => {
  response.send("Users");
};

export const getUsersById = (request: Request, response: Response) => {
  response.send("User By Id");
};

export const CreateUser = (request: Request, response: Response) => {
  response.send("Users");
};
