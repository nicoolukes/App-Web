import { ThemedView } from "./themed-view"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ThemedText } from "./themed-text"
import { useRouter } from "expo-router"
import { Colors } from "../constants/theme";
import { useColorScheme } from "../hooks/use-color-scheme";

export default function Header({ title }: { title: string }) {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <ThemedView>
            
            <ThemedView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 40,
                    backgroundColor: 'transparent', 
                    
                }}
            >
                <TouchableOpacity onPress={() => router.back()} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 50,
                    padding: 6,
                    marginTop: 16,
                }}>
                    <Ionicons name="arrow-back" size={24} color={colors.icon} />
                </TouchableOpacity>
                <ThemedText style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 12,
                    marginTop: 16,
                    
                }}>
                    {title}
                </ThemedText>
            </ThemedView>
        </ThemedView>
    )
}