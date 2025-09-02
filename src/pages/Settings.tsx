
import { Settings as SettingsIcon, User, Bell, Palette, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user, preferences, updatePreferences } = useAuth();

  const handleCategoryChange = (category: string, enabled: boolean) => {
    updatePreferences({
      categories: {
        ...preferences.categories,
        [category]: enabled
      }
    });
  };

  const handleDarkModeChange = (enabled: boolean) => {
    updatePreferences({ darkMode: enabled });
  };

  const handleNotificationsChange = (enabled: boolean) => {
    updatePreferences({ notifications: enabled });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg">
          <SettingsIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Customize your ContentHub experience</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Manage your profile information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium dark:text-white">{user?.name || 'User'}</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Premium Member</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Preferences */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Content Preferences</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Choose which types of content you want to see
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(preferences.categories).map(([category, enabled]) => (
              <div key={category} className="flex items-center justify-between">
                <Label htmlFor={category} className="capitalize font-medium dark:text-white">
                  {category}
                </Label>
                <Switch
                  id={category}
                  checked={enabled}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Control how you receive updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium dark:text-white">Push Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about trending content</p>
              </div>
              <Switch
                checked={preferences.notifications}
                onCheckedChange={handleNotificationsChange}
              />
            </div>
            <Separator className="dark:border-gray-600" />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium dark:text-white">Email Digest</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Weekly summary of your favorite topics</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>  
        </Card>

        {/* Appearance */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Customize the look and feel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium dark:text-white">Dark Mode</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Switch to dark theme</p>
              </div>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={handleDarkModeChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Manage your privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Export My Data
            </Button>
            <Button variant="destructive" className="w-full">
              Reset All Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
