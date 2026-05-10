import { Container, ContainerContent } from "@/components/container";
import GripsLogo from "@/components/elements/GripsLogo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { GitBranch } from "lucide-react";
import type { PropsWithChildren } from "react";

const aboutManifest = [
  {
    id: "what-is-grips?",
    title: "What is grips?",
    content: "grips is a simple web implementation of yt-dlp for downloading media from the internet. Development began on December 24, 2025, and is still actively being improved. grips' initial design was inspired by cobalt.tools by imputnet, and its UI was redesigned in V2, utilizing the UI from shadcn."
  },
  {
    id: "responsible?",
    title: "What is the responsibility of using grips?",
    content: "Users are ultimately responsible for using Grips."
  },
  {
    id: "bug?",
    title: "I found a bug, what should I do?",
    content: "Open the grips repository on github and open an issue there, I will read and fix it"
  }
]

const AboutDrawer = ({ children }: PropsWithChildren) => {
  return (
    <Drawer>
      <DrawerTrigger>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <GripsLogo />
          </DrawerTitle>
          <DrawerDescription>Development information about grips project</DrawerDescription>
        </DrawerHeader>
        <Container>
          <ContainerContent className="max-w-180">
            <Accordion type="single" defaultValue="what-is-grips?">
              {aboutManifest.map((setting, index) => (
                <AccordionItem value={setting.id} key={index}>
                  <AccordionTrigger>{setting.title}</AccordionTrigger>
                  <AccordionContent>{setting.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ContainerContent>
        </Container>
        <DrawerFooter>
          <a href="https://github.com/Kuredew/grips" className="mx-auto"><Button className="w-fit! mx-auto"><GitBranch />  Go To Grips Repository</Button></a>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AboutDrawer
