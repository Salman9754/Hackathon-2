import { Container } from "../_layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section with gradient and animation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />
        
        <Container className="py-28 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary mb-2">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Just launched: New AI features</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Break free</span> from complexity
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl animate-in fade-in">
              Your all-in-one solution that turns chaos into clarity. No more juggling tools.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 group">
                Get Started <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                See Demo
              </Button>
            </div>
            
            <div className="pt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-muted border-2 border-background`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground"><span className="font-medium">1,200+</span> teams already onboard</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-6 w-6 text-amber-500" />,
              title: "Lightning Fast",
              description: "10x your productivity with our intuitive interface and rapid workflows."
            },
            {
              icon: <BarChart3 className="h-6 w-6 text-emerald-500" />,
              title: "Data-Driven",
              description: "Make confident decisions with real-time analytics and actionable insights."
            },
            {
              icon: <Sparkles className="h-6 w-6 text-violet-500" />,
              title: "AI-Powered",
              description: "Our smart assistant learns your patterns to automate repetitive tasks."
            }
          ].map((feature, i) => (
            <Card key={i} className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-all">
              <div className="h-1.5 bg-gradient-to-r from-primary/80 to-primary/40" />
              <CardContent className="p-8">
                <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="py-12">
        <Card className="border-none overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-0" />
            <CardContent className="relative z-10 p-12 flex flex-col items-center text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to level up?</h2>
              <p className="text-muted-foreground max-w-lg text-lg">
                Join the companies who've increased productivity by 35% in their first month.
              </p>
              <Button size="lg" className="rounded-full px-8 group">
                Start Free <span className="ml-1 text-xs">—</span> No Credit Card
              </Button>
            </CardContent>
          </div>
        </Card>
      </Container>
    </div>
  );
}