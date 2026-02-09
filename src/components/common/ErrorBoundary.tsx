"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { ErrorPage } from "./ErrorPage";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // تحديد نوع الخطأ بناءً على رسالة الخطأ
      let errorCode: 401 | 403 | 404 | 500 = 500;
      
      if (this.state.error) {
        const errorMessage = this.state.error.message.toLowerCase();
        if (errorMessage.includes("401") || errorMessage.includes("unauthorized")) {
          errorCode = 401;
        } else if (errorMessage.includes("403") || errorMessage.includes("forbidden")) {
          errorCode = 403;
        } else if (errorMessage.includes("404") || errorMessage.includes("not found")) {
          errorCode = 404;
        }
      }

      return (
        <ErrorPage
          errorCode={errorCode}
          title={this.state.error?.message || "حدث خطأ غير متوقع"}
        />
      );
    }

    return this.props.children;
  }
}






