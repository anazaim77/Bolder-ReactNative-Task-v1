import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StoreTypes } from '@/types';

interface SyncStatusBadgeProps {
  syncStatus: StoreTypes.SyncStatus;
  style?: any;
}

const SyncStatusBadge: React.FC<SyncStatusBadgeProps> = ({ syncStatus, style }) => {
  const getStatusConfig = (status: StoreTypes.SyncStatus) => {
    switch (status) {
      case 'pending':
        return {
          icon: '⏳',
          text: 'Syncing...',
          backgroundColor: '#FFF3CD',
          textColor: '#856404',
          borderColor: '#FFEAA7'
        };
      case 'synced':
      case 'success':
        return {
          icon: '✅',
          text: 'Synced',
          backgroundColor: '#D4EDDA',
          textColor: '#155724',
          borderColor: '#C3E6CB'
        };
      case 'error':
        return {
          icon: '❌',
          text: 'Sync failed',
          backgroundColor: '#F8D7DA',
          textColor: '#721C24',
          borderColor: '#F5C6CB'
        };
      default:
        return {
          icon: '⚪',
          text: 'Unknown',
          backgroundColor: '#E2E3E5',
          textColor: '#6C757D',
          borderColor: '#D6D8DB'
        };
    }
  };

  const config = getStatusConfig(syncStatus);

  return (
    <View 
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
        style
      ]}
    >
      <Text style={[styles.text, { color: config.textColor }]}>
        {config.icon} {config.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SyncStatusBadge;