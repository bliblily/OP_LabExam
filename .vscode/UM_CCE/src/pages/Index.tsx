import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Code, 
  Database, 
  Globe, 
  Smartphone, 
  Trophy, 
  Users, 
  BookOpen, 
  Award, 
  ChevronRight,
  Zap,
  Target,
  Lightbulb
} from "lucide-react";
import cceHero from "@/assets/cce-hero.jpg";
import computingLab from "@/assets/computing-lab.jpg";
import programmingConcept from "@/assets/programming-concept.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                University of Mindanao
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                College of
                <span className="block bg-gradient-to-r from-um-yellow to-white bg-clip-text text-transparent">
                  Computing Education
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-lg">
                Empowering the next generation of tech innovators through cutting-edge computing education and hands-on learning experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary" className="group">
                  <Link to="/register" className="flex items-center">
                    Join CCE Today
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                  <Link to="/login">Student Portal</Link>
                </Button>
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <img 
                src={cceHero} 
                alt="UM College of Computing Education students working with technology"
                className="rounded-lg shadow-elegant w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About CCE Section */}
      <section className="py-24 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4" variant="outline">About Our College</Badge>
            <h2 className="text-4xl font-bold mb-6">Why Choose UM CCE?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The College of Computing Education at University of Mindanao is dedicated to producing world-class 
              IT professionals through innovative curriculum, state-of-the-art facilities, and industry partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card-shadow hover:shadow-elegant transition-shadow animate-fade-in group" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Industry-Focused Curriculum</CardTitle>
                <CardDescription>
                  Our programs are designed with input from industry leaders to ensure graduates are job-ready.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card-shadow hover:shadow-elegant transition-shadow animate-fade-in group" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Cutting-Edge Technology</CardTitle>
                <CardDescription>
                  Access to latest software, hardware, and development tools to enhance your learning experience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card-shadow hover:shadow-elegant transition-shadow animate-fade-in group" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Innovation & Research</CardTitle>
                <CardDescription>
                  Participate in cutting-edge research projects and develop innovative solutions to real-world problems.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4" variant="outline">Our Programs</Badge>
            <h2 className="text-4xl font-bold mb-6">Computing Education Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of computing programs designed to meet industry demands.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img 
                src={computingLab} 
                alt="Modern computing laboratory with students"
                className="rounded-lg shadow-elegant w-full h-auto object-cover"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Computer Science</h3>
                    <p className="text-muted-foreground">
                      Comprehensive program covering algorithms, data structures, software engineering, and computer systems.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Information Technology</h3>
                    <p className="text-muted-foreground">
                      Focus on practical IT skills, system administration, networking, and enterprise solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Web Development</h3>
                    <p className="text-muted-foreground">
                      Modern web technologies, frameworks, and full-stack development methodologies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mobile Development</h3>
                    <p className="text-muted-foreground">
                      iOS and Android app development using the latest frameworks and technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Section */}
      <section className="py-24 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4" variant="outline">Student Success</Badge>
            <h2 className="text-4xl font-bold mb-6">Our Students Excel</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              CCE students consistently achieve excellence in academics, competitions, and professional careers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center p-6 shadow-card-shadow hover:shadow-elegant transition-shadow">
                  <Trophy className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary mb-2">95%</h3>
                  <p className="text-sm text-muted-foreground">Job Placement Rate</p>
                </Card>
                
                <Card className="text-center p-6 shadow-card-shadow hover:shadow-elegant transition-shadow">
                  <Award className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-accent mb-2">50+</h3>
                  <p className="text-sm text-muted-foreground">Competition Awards</p>
                </Card>
                
                <Card className="text-center p-6 shadow-card-shadow hover:shadow-elegant transition-shadow">
                  <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary mb-2">1200+</h3>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                </Card>
                
                <Card className="text-center p-6 shadow-card-shadow hover:shadow-elegant transition-shadow">
                  <BookOpen className="w-8 h-8 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-accent mb-2">30+</h3>
                  <p className="text-sm text-muted-foreground">Industry Partners</p>
                </Card>
              </div>
            </div>
            <div className="animate-fade-in">
              <img 
                src={programmingConcept} 
                alt="Programming and software development concept"
                className="rounded-lg shadow-elegant w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join the University of Mindanao College of Computing Education and transform your passion for technology into a successful career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link to="/register" className="flex items-center">
                  Apply Now
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                <Link to="/login">Student Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">UM CCE</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              University of Mindanao - College of Computing Education
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 University of Mindanao. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;