// import { Request, Response, NextFunction } from "express";
// export type AuthRequest = Request & { id_user: string, role: string, cookies: { token: string }, user: { id_user: string, role: string } };
// export type AuthResponse = Response & { id_user: string, role: string, cookies: { token: string }, user: { id_user: string, role: string } };
// export type AuthNext = NextFunction & { id_user: string, role: string, cookies: { token: string }, user: { id_user: string, role: string } };
//TODO: ControlllerRequest, ControllerResponse, Payload type
export type AuthRequest = any;
export type AuthResponse = any;
export type AuthNext = any;
