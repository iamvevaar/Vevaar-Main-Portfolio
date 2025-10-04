import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function TechStackSection() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={icons}
        direction="right"
        speed="slow"
      />
    </div>
  )
}

const icons = [
    { src: "/Icons/analytics.svg", name: "Analytics" },
    { src: "/Icons/android.svg", name: "Android" },
    { src: "/Icons/anthropic.svg", name: "Anthropic" },
    { src: "/Icons/aws.svg", name: "AWS" },
    { src: "/Icons/c++.svg", name: "C++" },
    { src: "/Icons/claude.svg", name: "Claude" },
    { src: "/Icons/cloudflare.svg", name: "Cloudflare" },
    { src: "/Icons/cloudinary.svg", name: "Cloudinary" },
    { src: "/Icons/colab.svg", name: "Colab" },
    { src: "/Icons/comfyui.svg", name: "ComfyUI" },
    { src: "/Icons/copilotgithub.svg", name: "GitHub Copilot" },
    { src: "/Icons/css3.svg", name: "CSS3" },
    { src: "/Icons/django.svg", name: "Django" },
    { src: "/Icons/docker.svg", name: "Docker" },
    { src: "/Icons/ec2.svg", name: "EC2" },
    { src: "/Icons/elastic.svg", name: "Elastic" },
    { src: "/Icons/electron.svg", name: "Electron" },
    { src: "/Icons/eslint.svg", name: "ESLint" },
    { src: "/Icons/expressjs.svg", name: "Express.js" },
    { src: "/Icons/figma.svg", name: "Figma" },
    { src: "/Icons/firebase.svg", name: "Firebase" },
    { src: "/Icons/framer.svg", name: "Framer" },
    { src: "/Icons/gcloud.svg", name: "Google Cloud" },
    { src: "/Icons/gemini.svg", name: "Gemini" },
    { src: "/Icons/gemma.svg", name: "Gemma" },
    { src: "/Icons/git.svg", name: "Git" },
    { src: "/Icons/github.svg", name: "GitHub" },
    { src: "/Icons/gitlab.svg", name: "GitLab" },
    { src: "/Icons/gsap.svg", name: "GSAP" },
    { src: "/Icons/hotjar.svg", name: "Hotjar" },
    { src: "/Icons/html5.svg", name: "HTML5" },
    { src: "/Icons/huggingface.svg", name: "Hugging Face" },
    { src: "/Icons/jira.svg", name: "Jira" },
    { src: "/Icons/js.svg", name: "JavaScript" },
    { src: "/Icons/kibana.svg", name: "Kibana" },
    { src: "/Icons/kubernetes.svg", name: "Kubernetes" },
    { src: "/Icons/langchain.svg", name: "LangChain" },
    { src: "/Icons/langgraph.svg", name: "LangGraph" },
    { src: "/Icons/langsmith.svg", name: "LangSmith" },
    { src: "/Icons/linux.svg", name: "Linux" },
    { src: "/Icons/lovable.svg", name: "Lovable" },
    { src: "/Icons/materialui.svg", name: "Material-UI" },
    { src: "/Icons/mongodb.svg", name: "MongoDB" },
    { src: "/Icons/mongoose.svg", name: "Mongoose" },
    { src: "/Icons/mysql.svg", name: "MySQL" },
    { src: "/Icons/n8n.svg", name: "n8n" },
    { src: "/Icons/nodejs.svg", name: "Node.js" },
    { src: "/Icons/notion.svg", name: "Notion" },
    { src: "/Icons/npm2.svg", name: "npm" },
    { src: "/Icons/openai.svg", name: "OpenAI" },
    { src: "/Icons/postgresql.svg", name: "PostgreSQL" },
    { src: "/Icons/postman.svg", name: "Postman" },
    { src: "/Icons/prisma.svg", name: "Prisma" },
    { src: "/Icons/python.svg", name: "Python" },
    { src: "/Icons/react.svg", name: "React" },
    { src: "/Icons/reactquery.svg", name: "React Query" },
    { src: "/Icons/redis.svg", name: "Redis" },
    { src: "/Icons/redux.svg", name: "Redux" },
    { src: "/Icons/swagger.svg", name: "Swagger" },
    { src: "/Icons/typescript.svg", name: "TypeScript" },
    { src: "/Icons/vitejs.svg", name: "Vite.js" },
    { src: "/Icons/webassembly.svg", name: "WebAssembly" },
];
