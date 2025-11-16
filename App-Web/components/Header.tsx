import { ThemedView } from "./themed-view"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ThemedText } from "./themed-text"
import { useRouter } from "expo-router"

export default function Header({ title }: { title: string }) {
    const router = useRouter();

    return (
        <ThemedView>
            {/* Header personalizado */}
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
                    <Ionicons name="arrow-back" size={24} color="#d3d3d3ff" />
                </TouchableOpacity>
                <ThemedText style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 12,
                    marginTop: 16,
                    color: '#fff',
                }}>
                    {title}
                </ThemedText>
            </ThemedView>
        </ThemedView>
    )
}