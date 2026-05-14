import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PropsWithChildren } from "react";
import { settingsManifest, useSettingStore } from "@/store/useSettingStore";

const SettingsModal = ({ children }: PropsWithChildren) => {
  const { settingsValues, setValue } = useSettingStore();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Change the grips settings here</DialogDescription>
        </DialogHeader>

        <Tabs>
          <TabsList defaultValue={"appearance"}>
            {settingsManifest.map((settingCategory, index) => (
              <TabsTrigger value={settingCategory.id} key={index}>
                {settingCategory.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {settingsManifest.map((settingCategory, index) => (
            <TabsContent key={index} value={settingCategory.id}>
              <Card className="overflow-y-scroll max-h-[50dvh] no-scrollbar">
                <CardContent>
                  <FieldGroup>
                    {settingCategory.settings.map((setting, index) => (
                      <>
                        <Field
                          key={index}
                          orientation={
                            setting.type === "switch"
                              ? "horizontal"
                              : "vertical"
                          }
                        >
                          <FieldContent>
                            <FieldLabel>{setting.title}</FieldLabel>
                            <FieldDescription>
                              {setting.description}
                            </FieldDescription>
                          </FieldContent>

                          {setting.type === "switch" ? (
                            <Switch
                              checked={
                                settingsValues[setting.id] ? true : false
                              }
                              onCheckedChange={(checked) =>
                                setValue(setting.id, checked)
                              }
                              id={setting.id}
                            />
                          ) : (
                            <ButtonGroup className="w-full!">
                              {setting.radioContent?.map((field, index) => (
                                <Button
                                  key={index}
                                  variant={
                                    settingsValues[setting.id] === field.value
                                      ? "default"
                                      : "outline"
                                  }
                                  onClick={() =>
                                    setValue(setting.id, field.value)
                                  }
                                >
                                  {field.field}
                                </Button>
                              ))}
                            </ButtonGroup>
                          )}
                        </Field>
                        {index < settingCategory.settings.length - 1 && (
                          <FieldSeparator key={index + "2"} />
                        )}
                      </>
                    ))}
                  </FieldGroup>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
