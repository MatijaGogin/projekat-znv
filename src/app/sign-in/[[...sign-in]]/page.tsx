import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex flex-col items-center mt-9">
      <SignIn />
    </div>
  );
}