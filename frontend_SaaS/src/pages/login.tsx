import { Button, Card, Text, TextField } from "@radix-ui/themes";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement login logic
  };

  return (
    <Card className="p-6">
      <Text size="6" weight="bold" className="mb-6 text-center">
        Login
      </Text>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <TextField.Root>
            <TextField.Slot>
              <input
                type="email"
                required
                className="w-full px-3 py-2 text-sm bg-transparent outline-none border border-zinc-200 rounded-lg focus:border-emerald-500"
              />
            </TextField.Slot>
          </TextField.Root>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <TextField.Root>
            <TextField.Slot>
              <input
                type="password"
                required
                className="w-full px-3 py-2 text-sm bg-transparent outline-none border border-zinc-200 rounded-lg focus:border-emerald-500"
              />
            </TextField.Slot>
          </TextField.Root>
        </div>
        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          Sign In
        </Button>
      </form>
    </Card>
  );
};

export default Login;
