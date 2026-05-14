import { Container, ContainerContent } from "@/components/container"
import AboutDrawer from "@/components/elements/AboutDrawer"
import GripsLogo from "@/components/elements/GripsLogo"
import QueueModal from "@/components/elements/QueueModal"
import SettingsModal from "@/components/elements/SettingsModal"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { DownloadIcon, NewspaperIcon, SettingsIcon } from "lucide-react"

const Navbar = () => {
  return (
    <Container className="fixed top-0 border-b border-b-accent">
      <ContainerContent className="flex items-center py-2">
        <div className="flex gap-4">
          <GripsLogo />
        </div>

        <NavigationMenu className="ml-auto">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <QueueModal>
                <NavigationMenuLink>
                  <DownloadIcon />
                  Queues
                </NavigationMenuLink>
              </QueueModal>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <AboutDrawer>
                <NavigationMenuLink>
                  <NewspaperIcon />
                  <div className="hidden md:block">
                    About
                  </div>
                </NavigationMenuLink>
              </AboutDrawer>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <SettingsModal>
                <NavigationMenuLink>
                  <SettingsIcon />
                  <div className="hidden md:block">
                    Settings
                  </div>
                </NavigationMenuLink>
              </SettingsModal>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </ContainerContent>
    </Container>
  )
}

export default Navbar
