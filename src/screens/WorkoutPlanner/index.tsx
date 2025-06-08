import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  deleteWorkoutPlan,
  setWorkoutSyncStatus,
} from "@/store/slices/workoutsSlice";
import ModalCreateWorkoutPlan from "@/components/workout/ModalCreateWorkoutPlan";
import SyncStatusBadge from "@/components/common/SyncStatusBadge";
import { StoreTypes } from "@/types";

export default function WorkoutPlanner() {
  const dispatch = useDispatch<AppDispatch>();
  const workoutPlans = useSelector(
    (state: RootState) => state.workouts.workoutPlans || []
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePlan = useCallback((planId: string, planName: string) => {
    Alert.alert(
      "Delete Workout Plan",
      `Are you sure you want to delete "${planName}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            try {
              dispatch(deleteWorkoutPlan(planId));
              Alert.alert("Success", "Workout plan deleted successfully.");
            } catch (error) {
              Alert.alert("Error", "Failed to delete workout plan. Please try again.");
            }
          },
        },
      ]
    );
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const handleCreatePlan = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const renderWorkoutPlan = useCallback(({ item }: { item: StoreTypes.WorkoutPlan }) => {
    const exerciseCount = item.exercises?.length || 0;
    const totalSets = item.exercises?.reduce((sum, ex) => sum + (ex.sets || 0), 0) || 0;
    
    return (
      <View style={styles.planItem}>
        <View style={styles.planHeader}>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>{item.name}</Text>
            <View style={styles.planStats}>
              <Text style={styles.exerciseCount}>
                {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''}
              </Text>
              <Text style={styles.setCount}>
                {totalSets} total sets
              </Text>
            </View>
          </View>
          <View style={styles.planActions}>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => Alert.alert("View Plan", "Plan details would open here")}
              accessibilityRole="button"
              accessibilityLabel={`View ${item.name} workout plan`}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePlan(item.id, item.name)}
              accessibilityRole="button"
              accessibilityLabel={`Delete ${item.name} workout plan`}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {exerciseCount > 0 && (
          <View style={styles.exercisePreview}>
            <Text style={styles.exercisePreviewTitle}>Exercises:</Text>
            <View style={styles.exerciseList}>
              {item.exercises?.slice(0, 3).map((exercise) => (
                <Text key={exercise.id} style={styles.exerciseItem}>
                  • {exercise.name} ({exercise.sets || 0} sets × {exercise.reps || 0} reps)
                </Text>
              ))}
              {exerciseCount > 3 && (
                <Text style={styles.moreExercises}>
                  +{exerciseCount - 3} more exercise{exerciseCount - 3 !== 1 ? 's' : ''}
                </Text>
              )}
            </View>
          </View>
        )}
        
        {item.syncStatus && (
          <SyncStatusBadge syncStatus={item.syncStatus} style={styles.syncStatusBadge} />
        )}
      </View>
    );
  }, [handleDeletePlan]);

  const emptyComponent = useMemo(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Workout Plans Yet</Text>
      <Text style={styles.emptyText}>
        Create your first workout plan to get started with your fitness journey!
      </Text>
      <TouchableOpacity
        style={styles.emptyCreateButton}
        onPress={handleCreatePlan}
      >
        <Text style={styles.emptyCreateButtonText}>Create Your First Plan</Text>
      </TouchableOpacity>
    </View>
  ), [handleCreatePlan]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading workout plans...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>My Workout Plans</Text>
          <Text style={styles.subtitle}>
            {workoutPlans.length} plan{workoutPlans.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreatePlan}
          accessibilityRole="button"
          accessibilityLabel="Create new workout plan"
        >
          <Text style={styles.createButtonText}>+ Create Plan</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={workoutPlans}
        keyExtractor={(item) => item.id}
        renderItem={renderWorkoutPlan}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: workoutPlans?.length > 0 ? 100 : 50,
        }}
        ListEmptyComponent={emptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#007bff']}
            tintColor="#007bff"
          />
        }
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />

      <ModalCreateWorkoutPlan
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6c757d",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
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
    fontWeight: "500",
  },
  createButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  planItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  planInfo: {
    flex: 1,
    marginRight: 12,
  },
  planName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 8,
  },
  planStats: {
    flexDirection: "row",
    gap: 16,
  },
  exerciseCount: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  setCount: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  planActions: {
    flexDirection: "row",
    gap: 8,
  },
  viewButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  exercisePreview: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  exercisePreviewTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  exerciseList: {
    gap: 4,
  },
  exerciseItem: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 20,
  },
  moreExercises: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "500",
    fontStyle: "italic",
  },
  syncStatusBadge: {
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyCreateButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyCreateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
