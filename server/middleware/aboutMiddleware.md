# Middleware

This directory contains Express middleware functions used across the application.

## Purpose

Middleware functions:
- Process requests before they reach route handlers
- Perform common tasks like authentication, logging, error handling
- Can modify request and response objects
- Can terminate the request-response cycle or pass control to the next middleware

## Examples

- authMiddleware.js - Validates JWT tokens and handles authorization
- errorHandler.js - Centralizes error handling
- validateRequest.js - Validates incoming request data