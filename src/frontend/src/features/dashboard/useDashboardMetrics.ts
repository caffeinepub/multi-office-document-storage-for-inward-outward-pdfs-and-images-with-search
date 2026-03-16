import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";

type DashboardMetrics = {
  totalDocuments: number;
  uniqueUserCount: number;
  inwardDocuments: number;
  outwardDocuments: number;
  importantDocuments: number;
};

export function useDashboardMetrics() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<DashboardMetrics>({
    queryKey: ["dashboardMetrics"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");

      try {
        // Use dedicated getDashboardMetrics backend function
        const metrics = await actor.getDashboardMetrics();
        return {
          totalDocuments: Number(metrics.totalDocuments),
          uniqueUserCount: Number(metrics.uniqueUserCount),
          inwardDocuments: Number(metrics.inwardDocuments),
          outwardDocuments: Number(metrics.outwardDocuments),
          importantDocuments: Number(metrics.importantDocuments),
        };
      } catch {
        // Fallback: compute from filterDocuments
        const allDocuments = await actor.filterDocuments(
          null,
          null,
          null,
          null,
          null,
          null,
        );
        const uniqueUploaders = new Set(
          allDocuments.map((doc) => doc.uploader.toString()),
        );
        const inward = allDocuments.filter(
          (doc) =>
            String(doc.direction) === "inward" ||
            (doc.direction as unknown as Record<string, unknown>)?.inward !==
              undefined,
        ).length;
        const outward = allDocuments.filter(
          (doc) =>
            String(doc.direction) === "outward" ||
            (doc.direction as unknown as Record<string, unknown>)?.outward !==
              undefined,
        ).length;
        const important = allDocuments.filter(
          (doc) =>
            String(doc.direction) === "importantDocuments" ||
            (doc.direction as unknown as Record<string, unknown>)
              ?.importantDocuments !== undefined,
        ).length;
        return {
          totalDocuments: allDocuments.length,
          uniqueUserCount: uniqueUploaders.size,
          inwardDocuments: inward,
          outwardDocuments: outward,
          importantDocuments: important,
        };
      }
    },
    enabled: !!actor && !isActorFetching,
  });
}
