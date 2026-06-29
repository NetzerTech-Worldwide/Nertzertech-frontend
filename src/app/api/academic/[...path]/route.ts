import { createProxyHandler } from "@/app/api/_lib/createProxyHandler";

const proxyAcademicRequest = createProxyHandler("academic");

export const GET = proxyAcademicRequest;
export const POST = proxyAcademicRequest;
export const PATCH = proxyAcademicRequest;
export const DELETE = proxyAcademicRequest;