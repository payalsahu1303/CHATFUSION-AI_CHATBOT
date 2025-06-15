import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <Card className="w-[340px] p-6 shadow-2xl">
        <CardContent className="flex flex-col items-center gap-6 mt-4">
          <h1 className="text-2xl font-bold text-center">Welcome to ChatFusion</h1>
          <Button variant="outline" onClick={login} className="w-full">
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </Button>
          {user && (
            <div className="flex flex-col items-center mt-4">
              <Avatar>
                <AvatarImage src={user.photoURL} alt={user.displayName} />
                <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-sm">{user.displayName}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
