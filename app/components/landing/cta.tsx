import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { createServerFn, useServerFn } from "@tanstack/start";
import { config } from "@/config";

export const subscribeFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().min(5),
  message: z.string().min(2).max(240),
});

const subscribeToNewsletter = createServerFn({
  method: "POST",
})
  .validator(subscribeFormSchema)
  .handler(async (ctx) => {
    const { email, name, message } = ctx.data;
    try {
      // You can either set the env variables but for repro purposes we'll just log
      console.log(email, name, message);
      // await fetch(`${config.listmonkApiUrl}/subscribers`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email,
      //     name,
      //     status: "enabled",
      //     lists: [34],
      //     attribs: { messsage: message },
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `token ${config.listmonkApiKey}`,
      //   },
      // });
      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "Error al suscribirse",
      };
    }
  });

export function CallToAction() {
  const subscribe = useServerFn(subscribeToNewsletter);
  const form = useForm<z.infer<typeof subscribeFormSchema>>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (values: z.infer<typeof subscribeFormSchema>) => {
      subscribe({ data: values });
    },
    onSuccess() {
      toast({
        title: "Listo!",
        description: "Mensaje enviado con éxito.",
      });
    },
    onError() {
      toast({
        title: "Uy!",
        description: "Algo salió mal, intenta de nuevo.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof subscribeFormSchema>) {
    await subscribeMutation.mutateAsync(values);
  }

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-screen-xl pb-0 lg:pb-24">
        <div className="text-center">
          <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="relative z-10 flex flex-col p-3 border bg-background rounded-lg shadow-lg">
                  <div className="flex flex-col md:flex-row lg:gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Maria" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="sr-only">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@ejemplo.com" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Mensaje</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Dejanos tu mensaje"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="mt-3"
                    // disabled={subscribeMutation.isPending}
                    data-umami-event="CTA button"
                  >
                    Suscribirme
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
