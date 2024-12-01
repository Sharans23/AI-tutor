"use client";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Book,
  ImageIcon,
  MessageSquare,
  Music,
  Video,
  Upload,
  Send,
  Plus,
  Settings,
  User,
  LogOut,
  BarChart,
  Brain,
  Award,
  FlashlightIcon as Flashcard,
  VolumeIcon as VolumeUp,
  Users,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Globe,
  UserCircle,
  Mic,
  Edit2,
} from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "Chinese" },
];

export default function Component() {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "Introduction to AI",
      messages: [
        {
          sender: "AI",
          content:
            "Welcome! How can I assist you with your learning about AI today?",
          type: "text",
        },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [inputMessage, setInputMessage] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("text");
  const scrollAreaRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [learningMode, setLearningMode] = useState("conversation");
  const [progress, setProgress] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([
    {
      question: "What is the primary goal of AI?",
      options: [
        "To replace humans",
        "To enhance human capabilities",
        "To create robots",
        "To predict the future",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which of these is NOT a type of machine learning?",
      options: [
        "Supervised learning",
        "Unsupervised learning",
        "Reinforcement learning",
        "Intuitive learning",
      ],
      correctAnswer: 3,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [flashcards, setFlashcards] = useState([
    {
      front: "What is AI?",
      back: "Artificial Intelligence: the simulation of human intelligence in machines.",
    },
    {
      front: "What is Machine Learning?",
      back: "A subset of AI that enables systems to learn and improve from experience without being explicitly programmed.",
    },
  ]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [vocabularyList, setVocabularyList] = useState([
    {
      term: "Algorithm",
      definition:
        "A set of rules or instructions given to an AI program to help it learn on its own.",
      example: "A sorting algorithm arranges items in a specific order.",
    },
    {
      term: "Neural Network",
      definition: "A computer system designed to work like the human brain.",
      example: "A neural network might be used for image recognition tasks.",
    },
  ]);
  const [collaborativeSessions, setCollaborativeSessions] = useState([
    {
      id: 1,
      topic: "Introduction to Machine Learning",
      participants: ["User1", "User2"],
    },
  ]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New course content available!", read: false },
    {
      id: 2,
      message: "You've completed 50% of your current module!",
      read: false,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    language: "en",
    avatar: "/placeholder-avatar.jpg",
  });
  const [dashboardWidgets, setDashboardWidgets] = useState([
    {
      id: 1,
      title: "Learning Progress",
      content: <Progress value={progress} className="w-full" />,
    },
    {
      id: 2,
      title: "Recent Achievements",
      content: <p>Completed Introduction to AI module</p>,
    },
    {
      id: 3,
      title: "Upcoming Sessions",
      content: <p>Machine Learning Basics - Tomorrow at 2 PM</p>,
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingChatTitle, setEditingChatTitle] = useState("");


  const navigate = useNavigate();
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSend = () => {
    const updatedChats = chats.map((chat) => {
      if (chat.id === currentChatId) {
        const newMessages = [...chat.messages];
        if (activeTab === "text" && inputMessage.trim()) {
          newMessages.push({
            sender: "User",
            content: inputMessage,
            type: "text",
          });
          setTimeout(() => {
            const aiResponse = `I've received your message about ${inputMessage}. How can I help you further with this topic?`;
            newMessages.push({
              sender: "AI",
              content: aiResponse,
              type: "text",
            });
            setChats(
              chats.map((c) =>
                c.id === chat.id ? { ...c, messages: newMessages } : c
              )
            );
          }, 1000);
        } else if (activeTab === "media" && mediaPreview) {
          newMessages.push({
            sender: "User",
            content: mediaPreview,
            type: "image",
          });
          setTimeout(() => {
            const aiResponse =
              "I've received your image. Can you provide more context about what you'd like to learn from this visual aid?";
            newMessages.push({
              sender: "AI",
              content: aiResponse,
              type: "text",
            });
            setChats(
              chats.map((c) =>
                c.id === chat.id ? { ...c, messages: newMessages } : c
              )
            );
          }, 1000);
        }
        return { ...chat, messages: newMessages };
      }
      return chat;
    });
    setChats(updatedChats);
    setInputMessage("");
    setMediaPreview(null);
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createNewChat = () => {
    const newChatId = chats.length + 1;
    setChats([
      ...chats,
      { id: newChatId, title: `New Chat ${newChatId}`, messages: [] },
    ]);
    setCurrentChatId(newChatId);
  };

  const handleQuizSubmit = () => {
    if (
      selectedAnswer !== null &&
      currentQuestionIndex < quizQuestions.length
    ) {
      if (
        selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer
      ) {
        setQuizScore((prev) => prev + 1);
      }
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz finished
        setLearningMode("conversation");
        setProgress(100);
      }
    }
  };

  const flipFlashcard = () => {
    setIsFlashcardFlipped(!isFlashcardFlipped);
  };

  const nextFlashcard = () => {
    setCurrentFlashcardIndex(
      (prevIndex) => (prevIndex + 1) % flashcards.length
    );
    setIsFlashcardFlipped(false);
  };

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing authentication tokens)
    navigate("/login");
  };
  

  const prevFlashcard = () => {
    setCurrentFlashcardIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setIsFlashcardFlipped(false);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = userProfile.language;
    window.speechSynthesis.speak(utterance);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateUserProfile = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const currentChat =
    chats.find((chat) => chat.id === currentChatId) || chats[0];

  const startListening = () => {
    setIsListening(true);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = userProfile.language;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  };

  const startEditingChat = (chatId, currentTitle) => {
    setEditingChatId(chatId);
    setEditingChatTitle(currentTitle);
  };

  const saveEditedChatTitle = () => {
    setChats(
      chats.map((chat) =>
        chat.id === editingChatId ? { ...chat, title: editingChatTitle } : chat
      )
    );
    setEditingChatId(null);
    setEditingChatTitle("");
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`${isSidebarCollapsed ? "w-16" : "w-64"} ${
          darkMode ? "bg-gray-800" : "bg-white"
        } p-4 flex flex-col transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between mb-6">
          {!isSidebarCollapsed && (
            <h1 className="text-2xl font-bold">AI Tutor</h1>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        {!isSidebarCollapsed && (
          <>
            <Button onClick={createNewChat} className="mb-4 w-full">
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </>
        )}
        <ScrollArea className="flex-grow mb-4">
          {filteredChats.map((chat) => (
            <div key={chat.id} className="flex items-center mb-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        chat.id === currentChatId ? "secondary" : "ghost"
                      }
                      className={`w-full justify-start overflow-hidden overflow-ellipsis whitespace-nowrap ${
                        isSidebarCollapsed ? "px-2" : ""
                      }`}
                      onClick={() => setCurrentChatId(chat.id)}
                    >
                      <MessageSquare
                        className={`${
                          isSidebarCollapsed ? "" : "mr-2"
                        } h-4 w-4`}
                      />
                      {!isSidebarCollapsed &&
                        (editingChatId === chat.id ? (
                          <Input
                            value={editingChatTitle}
                            onChange={(e) =>
                              setEditingChatTitle(e.target.value)
                            }
                            onBlur={saveEditedChatTitle}
                            onKeyPress={(e) =>
                              e.key === "Enter" && saveEditedChatTitle()
                            }
                            className="w-full"
                          />
                        ) : (
                          chat.title
                        ))}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{chat.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {!isSidebarCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => startEditingChat(chat.id, chat.title)}
                  className="ml-2"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="w-full">
                <User
                  className={`${isSidebarCollapsed ? "" : "mr-2"} h-4 w-4`}
                />
                {!isSidebarCollapsed && "Profile"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart className="mr-2 h-4 w-4" />
                Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log in
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Navigation Bar */}
        <div
          className={`sticky top-0 z-10 p-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } border-b`}
        >
          <div className="flex justify-between items-center">
            <Tabs
              value={learningMode}
              onValueChange={(value) => setLearningMode(value)}
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="conversation">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Conversation
                </TabsTrigger>
                <TabsTrigger value="structured">
                  <Book className="mr-2 h-4 w-4" />
                  Structured
                </TabsTrigger>
                <TabsTrigger value="quiz">
                  <Brain className="mr-2 h-4 w-4" />
                  Quiz
                </TabsTrigger>
                <TabsTrigger value="flashcards">
                  <Flashcard className="mr-2 h-4 w-4" />
                  Flashcards
                </TabsTrigger>
                <TabsTrigger value="vocabulary">
                  <VolumeUp className="mr-2 h-4 w-4" />
                  Vocabulary
                </TabsTrigger>
                <TabsTrigger value="collaborative">
                  <Users className="mr-2 h-4 w-4" />
                  Collaborative
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center space-x-4">
              <Select
                value={userProfile.language}
                onValueChange={(value) => updateUserProfile("language", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    {notifications.some((n) => !n.read) && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {notifications.map((notif) => (
                    <DropdownMenuItem
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                    >
                      <span
                        className={notif.read ? "text-gray-500" : "font-bold"}
                      >
                        {notif.message}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`px-4 py-2 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Content Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {learningMode === "conversation" && (
            <div className="space-y-4">
              {currentChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.sender === "AI"
                      ? darkMode
                        ? "bg-gray-800"
                        : "bg-white"
                      : darkMode
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  }`}
                >
                  <div className="flex items-start">
                    <Avatar className="mr-2">
                      <AvatarImage
                        src={
                          message.sender === "AI"
                            ? "/ai-avatar.png"
                            : userProfile.avatar
                        }
                      />
                      <AvatarFallback>
                        {message.sender === "AI" ? "AI" : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{message.sender}</p>
                        {message.sender === "AI" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => speakText(message.content)}
                            className="ml-2"
                            aria-label="Read message aloud"
                          >
                            <VolumeUp className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {message.type === "text" ? (
                        <p>{message.content}</p>
                      ) : (
                        <img
                          src={message.content}
                          alt="User uploaded media"
                          className="mt-2 rounded-lg max-w-full h-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {learningMode === "structured" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Introduction to AI</h2>
              <p>
                Artificial Intelligence (AI) is a branch of computer science
                that aims to create intelligent machines that can perform tasks
                that typically require human intelligence.
              </p>
              <h3 className="text-xl font-semibold">Key Concepts:</h3>
              <ul className="list-disc list-inside">
                <li>Machine Learning</li>
                <li>Neural Networks</li>
                <li>Deep Learning</li>
                <li>Natural Language Processing</li>
              </ul>
              <p>
                As you progress through this structured learning path, we'll
                dive deeper into each of these concepts.
              </p>
            </div>
          )}

          {learningMode === "quiz" && quizQuestions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">AI Knowledge Quiz</h2>
              <p className="font-semibold">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </p>
              <p>{quizQuestions[currentQuestionIndex]?.question}</p>
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => setSelectedAnswer(parseInt(value))}
              >
                {quizQuestions[currentQuestionIndex]?.options.map(
                  (option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                      />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  )
                )}
              </RadioGroup>
              <Button
                onClick={handleQuizSubmit}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            </div>
          )}

          {learningMode === "flashcards" && (
            <div className="flex flex-col items-center justify-center">
              <Card
                className="w-96 h-64 cursor-pointer"
                onClick={flipFlashcard}
              >
                <CardContent className="h-full flex items-center justify-center">
                  <p className="text-xl font-semibold text-center">
                    {isFlashcardFlipped
                      ? flashcards[currentFlashcardIndex].back
                      : flashcards[currentFlashcardIndex].front}
                  </p>
                </CardContent>
              </Card>
              <div className="mt-4 flex space-x-4">
                <Button onClick={prevFlashcard}>Previous</Button>
                <Button onClick={nextFlashcard}>Next</Button>
              </div>
            </div>
          )}

          {learningMode === "vocabulary" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">AI Vocabulary Builder</h2>
              {vocabularyList.map((item, index) => (
                <Accordion type="single" collapsible key={index}>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>{item.term}</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        <strong>Definition:</strong> {item.definition}
                      </p>
                      <p>
                        <strong>Example:</strong> {item.example}
                      </p>
                      <Button
                        onClick={() => speakText(item.term)}
                        className="mt-2"
                      >
                        <VolumeUp className="mr-2 h-4 w-4" />
                        Pronounce
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          )}

          {learningMode === "collaborative" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Collaborative Learning Sessions
              </h2>
              {collaborativeSessions.map((session, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{session.topic}</CardTitle>
                    <CardDescription>Session ID: {session.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Participants: {session.participants.join(", ")}</p>
                  </CardContent>
                  <CardFooter>
                    <Button>Join Session</Button>
                  </CardFooter>
                </Card>
              ))}
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Session
              </Button>
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        {learningMode === "conversation" && (
          <div
            className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"} border-t`}
          >
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value)}
              className="w-full"
            >
              <TabsList className="mb-2">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>
              <TabsContent value="text">
                <div className="flex items-center space-x-2">
                  <Textarea
                    placeholder="Type your message here..."
                    className={`w-full ${
                      darkMode
                        ? "bg-gray-700 text-gray-100"
                        : "bg-gray-100 text-gray-900"
                    } border-gray-600 focus:border-blue-500`}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button onClick={startListening} disabled={isListening}>
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="media">
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    className="hidden"
                    id="media-upload"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Media
                    </label>
                  </Button>
                  {mediaPreview && (
                    <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                      <img
                        src={mediaPreview}
                        alt="Uploaded media preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="mr-7">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                      Customize your AI Tutor experience.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dark-mode"
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                      />
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <div>
                      <Label htmlFor="user-name">Name</Label>
                      <Input
                        id="user-name"
                        value={userProfile.name}
                        onChange={(e) =>
                          updateUserProfile("name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="user-email">Email</Label>
                      <Input
                        id="user-email"
                        value={userProfile.email}
                        onChange={(e) =>
                          updateUserProfile("email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="mr-7">
                    <BarChart className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Learning Dashboard</DialogTitle>
                    <DialogDescription>
                      Your personalized learning analytics
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {dashboardWidgets.map((widget) => (
                      <Card key={widget.id}>
                        <CardHeader>
                          <CardTitle>{widget.title}</CardTitle>
                        </CardHeader>
                        <CardContent>{widget.content}</CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={handleSend}>
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Dashboard */}
    </div>
  );
}
