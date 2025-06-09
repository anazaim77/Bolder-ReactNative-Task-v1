import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { StoreTypes } from "@/types"; // Ensure StoreTypes is correctly imported and defined
import SyncStatusBadge from "@/components/common/SyncStatusBadge";
import { format, parseISO } from "date-fns";

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

const WorkoutHistoryScreen = () => {
  const completedWorkouts = useSelector(
    (state: RootState) => state.history.completedWorkouts || []
  );
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate a network request or data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: StoreTypes.CompletedWorkout }) => (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <SyncStatusBadge syncStatus={item.syncStatus} />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemDate}>
            {format(parseISO(item.dateCompleted), "MMM d, yyyy - HH:mm")}
          </Text>
          <Text style={styles.itemDuration}>
            Duration: {formatDuration(item.duration)}
          </Text>
        </View>
        {item.exercises && item.exercises.length > 0 && (
          <View style={styles.exercisePreviewContainer}>
            <Text style={styles.exercisePreviewTitle}>
              Exercises ({item.exercises.length}):
            </Text>
            {item.exercises.slice(0, 2).map((ex) => (
              <Text key={ex.id} style={styles.exercisePreviewItem}>
                • {ex.name} ({ex.sets} sets x {ex.reps} reps)
              </Text>
            ))}
            {item.exercises.length > 2 && (
              <Text style={styles.exercisePreviewMore}>
                ...and {item.exercises.length - 2} more
              </Text>
            )}
          </View>
        )}
      </View>
    ),
    []
  );

  const keyExtractor = useCallback(
    (item: StoreTypes.CompletedWorkout) => item.id,
    []
  );

  const sortedWorkouts = useMemo(() => {
    return [...completedWorkouts].sort(
      (a, b) =>
        parseISO(b.dateCompleted).getTime() -
        parseISO(a.dateCompleted).getTime()
    );
  }, [completedWorkouts]);

  const ListEmptyComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Workout History</Text>
        <Text style={styles.emptyText}>
          You haven't completed any workouts yet. Get started!
        </Text>
      </View>
    ),
    []
  );

  if (completedWorkouts.length === 0 && !isRefreshing) {
    // Show a loading indicator if initially empty and not refreshing,
    // or just the empty component if truly no data.
    // For this example, we'll assume initial load is fast or handled by a global loader.
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Workout History</Text>
        <Text style={styles.subtitle}>
          {sortedWorkouts.length} session
          {sortedWorkouts.length !== 1 ? "s" : ""} recorded
        </Text>
      </View>
      <FlatList
        data={sortedWorkouts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#007bff"]}
            tintColor="#007bff"
          />
        }
        // Performance Optimizations
        initialNumToRender={10} // Render 10 items initially
        maxToRenderPerBatch={5} // Render 5 items per batch during scroll
        windowSize={10} // Virtualization window size (items)
        removeClippedSubviews={true} // Unmount views that are off-screen (Android only, use with caution)
        getItemLayout={(data, index) =>
          // Assuming fixed height for items for better performance, adjust if dynamic
          ({ length: 150, offset: 150 * index, index })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#343a40",
    flexShrink: 1,
  },
  itemDetails: {
    marginBottom: 8,
  },
  itemDate: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 4,
  },
  itemDuration: {
    fontSize: 14,
    color: "#495057",
  },
  exercisePreviewContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f1f3f5",
  },
  exercisePreviewTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
    marginBottom: 4,
  },
  exercisePreviewItem: {
    fontSize: 13,
    color: "#6c757d",
    marginLeft: 8,
  },
  exercisePreviewMore: {
    fontSize: 13,
    color: "#007bff",
    fontStyle: "italic",
    marginLeft: 8,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});

export default WorkoutHistoryScreen;
