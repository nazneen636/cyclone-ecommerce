"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

// -------------------- Validation Schema --------------------
const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be minimum 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// -------------------- Component --------------------
export function SignupForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values) {
    console.log("Submitted:", values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
          <FieldDescription>
            We'll use this to contact you. We will not share your email.
          </FieldDescription>
        </Field>

        {/* Password */}
        <Field className="relative">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...form.register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {/* {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
          </button>
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
          <FieldDescription>
            Minimum 8 characters, with uppercase, lowercase, number, special
            character.
          </FieldDescription>
        </Field>

        {/* Confirm Password */}
        <Field className="relative">
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            {...form.register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {/* {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />} */}
          </button>
          {form.formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </Field>

        <Field>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="#">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
