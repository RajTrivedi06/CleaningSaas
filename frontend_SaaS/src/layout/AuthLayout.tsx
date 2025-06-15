import { Box } from "@radix-ui/themes";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <Box className="min-h-screen flex items-center justify-center bg-zinc-50">
    <Box className="w-full max-w-md p-6">{children}</Box>
  </Box>
);

export default AuthLayout;
