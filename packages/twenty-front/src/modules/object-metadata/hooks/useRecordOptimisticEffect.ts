import { useEffect } from 'react';

import { useOptimisticEffect } from '@/apollo/optimistic-effect/hooks/useOptimisticEffect';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { OrderByField } from '@/object-metadata/types/OrderByField';
import { getRecordOptimisticEffectDefinition } from '@/object-record/graphql/optimistic-effect-definition/getRecordOptimisticEffectDefinition';
import { ObjectRecordQueryFilter } from '@/object-record/record-filter/types/ObjectRecordQueryFilter';

export const useRecordOptimisticEffect = ({
  objectMetadataItem,
  filter,
  orderBy,
  limit,
}: {
  objectMetadataItem: ObjectMetadataItem;
  filter?: ObjectRecordQueryFilter;
  orderBy?: OrderByField;
  limit?: number;
}) => {
  const { registerOptimisticEffect, unregisterOptimisticEffect } =
    useOptimisticEffect({
      objectNameSingular: objectMetadataItem.nameSingular,
    });

  useEffect(() => {
    const definition = getRecordOptimisticEffectDefinition({
      objectMetadataItem,
    });
    const variables = { filter, orderBy, limit };

    registerOptimisticEffect({ definition, variables });

    return () => unregisterOptimisticEffect({ definition, variables });
  }, [
    filter,
    limit,
    objectMetadataItem,
    orderBy,
    registerOptimisticEffect,
    unregisterOptimisticEffect,
  ]);
};
