"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { demoSchema, type DemoFormValues, PRACTICE_SIZES } from "@/lib/validations/demo";
import { submitDemoRequest } from "@/lib/actions/demo";

export function DemoRequestForm() {
  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: { name: "", email: "", practice: "", phone: "", message: "" },
  });
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: DemoFormValues) {
    const result = await submitDemoRequest(data);
    if (!result.success) {
      form.setError("root", { message: result.error ?? "Something went wrong. Please try again." });
    }
  }

  if (isSubmitSuccessful && !form.formState.errors.root) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#15835a]" />
        <h3 className="mt-3 text-[20px] font-bold text-foreground">Request received</h3>
        <p className="mt-1 text-muted-foreground">
          We&apos;ll be in touch to book your 30-minute demo.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-xl border border-border bg-card p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl><Input placeholder="Jane Smith" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Work email *</FormLabel>
              <FormControl><Input type="email" placeholder="jane@practice.com.au" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="practice" render={({ field }) => (
            <FormItem>
              <FormLabel>Practice name *</FormLabel>
              <FormControl><Input placeholder="Brunswick Family Medical" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="size" render={({ field }) => (
            <FormItem>
              <FormLabel>Practice size *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PRACTICE_SIZES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Phone (optional)</FormLabel>
            <FormControl><Input placeholder="(03) 9000 0000" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel>Anything we should know? (optional)</FormLabel>
            <FormControl><Textarea className="min-h-28 resize-none" placeholder="Tell us about your Practice…" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {form.formState.errors.root && (
          <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
        )}
        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
          {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</>) : "Book my demo"}
        </Button>
      </form>
    </Form>
  );
}
