export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      "affiliate-client-users": {
        Row: {
          affiliateClientUserId: string;
          affiliateClientUserStatus: Database["public"]["Enums"]["AffiliateClientUserStatus"];
          affiliateOwnerId: string | null;
          createdAt: string;
          lastUpdated: string;
          userId: string | null;
        };
        Insert: {
          affiliateClientUserId: string;
          affiliateClientUserStatus?: Database["public"]["Enums"]["AffiliateClientUserStatus"];
          affiliateOwnerId?: string | null;
          createdAt?: string;
          lastUpdated: string;
          userId?: string | null;
        };
        Update: {
          affiliateClientUserId?: string;
          affiliateClientUserStatus?: Database["public"]["Enums"]["AffiliateClientUserStatus"];
          affiliateOwnerId?: string | null;
          createdAt?: string;
          lastUpdated?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "affiliate-client-users_affiliateOwnerId_fkey";
            columns: ["affiliateOwnerId"];
            isOneToOne: false;
            referencedRelation: "affiliate-users";
            referencedColumns: ["affiliateUserId"];
          },
        ];
      };
      "affiliate-data": {
        Row: {
          affiliateDataCompanyName: string;
          affiliateDataDescription: string;
          affiliateDataId: string;
          affiliateDataLogo: string | null;
          affiliateDataMessage: string | null;
          affiliateDataWebsite: string | null;
          affiliateUserId: string | null;
          createdAt: string;
          lastUpdated: string;
        };
        Insert: {
          affiliateDataCompanyName: string;
          affiliateDataDescription: string;
          affiliateDataId: string;
          affiliateDataLogo?: string | null;
          affiliateDataMessage?: string | null;
          affiliateDataWebsite?: string | null;
          affiliateUserId?: string | null;
          createdAt?: string;
          lastUpdated: string;
        };
        Update: {
          affiliateDataCompanyName?: string;
          affiliateDataDescription?: string;
          affiliateDataId?: string;
          affiliateDataLogo?: string | null;
          affiliateDataMessage?: string | null;
          affiliateDataWebsite?: string | null;
          affiliateUserId?: string | null;
          createdAt?: string;
          lastUpdated?: string;
        };
        Relationships: [
          {
            foreignKeyName: "affiliate-data_affiliateUserId_fkey";
            columns: ["affiliateUserId"];
            isOneToOne: false;
            referencedRelation: "affiliate-users";
            referencedColumns: ["affiliateUserId"];
          },
        ];
      };
      "affiliate-performance": {
        Row: {
          affiliatePerformanceClicks: number;
          affiliatePerformanceDate: string;
          affiliatePerformanceId: string;
          affiliatePerformanceRevenue: number;
          affiliatePerformanceSales: number;
          affiliateUserId: string | null;
          createdAt: string;
          lastUpdated: string;
        };
        Insert: {
          affiliatePerformanceClicks: number;
          affiliatePerformanceDate: string;
          affiliatePerformanceId: string;
          affiliatePerformanceRevenue: number;
          affiliatePerformanceSales: number;
          affiliateUserId?: string | null;
          createdAt?: string;
          lastUpdated: string;
        };
        Update: {
          affiliatePerformanceClicks?: number;
          affiliatePerformanceDate?: string;
          affiliatePerformanceId?: string;
          affiliatePerformanceRevenue?: number;
          affiliatePerformanceSales?: number;
          affiliateUserId?: string | null;
          createdAt?: string;
          lastUpdated?: string;
        };
        Relationships: [
          {
            foreignKeyName: "affiliate-performance_affiliateUserId_fkey";
            columns: ["affiliateUserId"];
            isOneToOne: false;
            referencedRelation: "affiliate-users";
            referencedColumns: ["affiliateUserId"];
          },
        ];
      };
      "affiliate-users": {
        Row: {
          affiliateAdminId: string | null;
          affiliateUserId: string;
          affiliateUserReferralLink: string | null;
          affiliateUserRole: Database["public"]["Enums"]["AffiliateUserRole"];
          createdAt: string;
          lastUpdated: string;
          userId: string;
        };
        Insert: {
          affiliateAdminId?: string | null;
          affiliateUserId: string;
          affiliateUserReferralLink?: string | null;
          affiliateUserRole?: Database["public"]["Enums"]["AffiliateUserRole"];
          createdAt?: string;
          lastUpdated: string;
          userId: string;
        };
        Update: {
          affiliateAdminId?: string | null;
          affiliateUserId?: string;
          affiliateUserReferralLink?: string | null;
          affiliateUserRole?: Database["public"]["Enums"]["AffiliateUserRole"];
          createdAt?: string;
          lastUpdated?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "affiliate-users_affiliateAdminId_fkey";
            columns: ["affiliateAdminId"];
            isOneToOne: false;
            referencedRelation: "affiliate-users";
            referencedColumns: ["affiliateUserId"];
          },
        ];
      };
      designs: {
        Row: {
          createdAt: string;
          designId: string;
          designStatus: Database["public"]["Enums"]["DesignStatus"];
          lastUpdated: string;
          projectId: string;
        };
        Insert: {
          createdAt?: string;
          designId: string;
          designStatus?: Database["public"]["Enums"]["DesignStatus"];
          lastUpdated: string;
          projectId: string;
        };
        Update: {
          createdAt?: string;
          designId?: string;
          designStatus?: Database["public"]["Enums"]["DesignStatus"];
          lastUpdated?: string;
          projectId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "designs_projectId_fkey";
            columns: ["projectId"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["projectId"];
          },
        ];
      };
      "discount-codes": {
        Row: {
          createdAt: string;
          discountAmount: number;
          discountCode: string;
          discountCodeId: string;
          expiresAt: string | null;
          isPercent: boolean;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          discountAmount: number;
          discountCode: string;
          discountCodeId: string;
          expiresAt?: string | null;
          isPercent: boolean;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          discountAmount?: number;
          discountCode?: string;
          discountCodeId?: string;
          expiresAt?: string | null;
          isPercent?: boolean;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "discount-codes_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "affiliate-users";
            referencedColumns: ["affiliateUserId"];
          },
        ];
      };
      layers: {
        Row: {
          componentType: string;
          configuration: string;
          content: string;
          createdAt: string;
          lastUpdated: string;
          layerId: string;
          layoutId: string | null;
          pageId: string;
          styleVariant: number;
        };
        Insert: {
          componentType: string;
          configuration: string;
          content: string;
          createdAt?: string;
          lastUpdated: string;
          layerId: string;
          layoutId?: string | null;
          pageId: string;
          styleVariant: number;
        };
        Update: {
          componentType?: string;
          configuration?: string;
          content?: string;
          createdAt?: string;
          lastUpdated?: string;
          layerId?: string;
          layoutId?: string | null;
          pageId?: string;
          styleVariant?: number;
        };
        Relationships: [
          {
            foreignKeyName: "layers_layoutId_fkey";
            columns: ["layoutId"];
            isOneToOne: false;
            referencedRelation: "layouts";
            referencedColumns: ["layoutId"];
          },
          {
            foreignKeyName: "layers_pageId_fkey";
            columns: ["pageId"];
            isOneToOne: false;
            referencedRelation: "pages";
            referencedColumns: ["pageId"];
          },
        ];
      };
      layouts: {
        Row: {
          createdAt: string;
          designId: string | null;
          lastUpdated: string;
          layoutConfiguration: string;
          layoutId: string;
        };
        Insert: {
          createdAt?: string;
          designId?: string | null;
          lastUpdated: string;
          layoutConfiguration: string;
          layoutId: string;
        };
        Update: {
          createdAt?: string;
          designId?: string | null;
          lastUpdated?: string;
          layoutConfiguration?: string;
          layoutId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "layouts_designId_fkey";
            columns: ["designId"];
            isOneToOne: false;
            referencedRelation: "designs";
            referencedColumns: ["designId"];
          },
        ];
      };
      pages: {
        Row: {
          createdAt: string;
          designId: string;
          lastUpdated: string;
          pageConfiguration: string | null;
          pageId: string;
          pageSeoDescription: string | null;
          pageSeoEnabled: boolean;
          pageSeoImage: string | null;
          pageSeoKeywords: string[] | null;
          pageSeoTitle: string | null;
          pageTitle: string;
        };
        Insert: {
          createdAt?: string;
          designId: string;
          lastUpdated: string;
          pageConfiguration?: string | null;
          pageId: string;
          pageSeoDescription?: string | null;
          pageSeoEnabled: boolean;
          pageSeoImage?: string | null;
          pageSeoKeywords?: string[] | null;
          pageSeoTitle?: string | null;
          pageTitle: string;
        };
        Update: {
          createdAt?: string;
          designId?: string;
          lastUpdated?: string;
          pageConfiguration?: string | null;
          pageId?: string;
          pageSeoDescription?: string | null;
          pageSeoEnabled?: boolean;
          pageSeoImage?: string | null;
          pageSeoKeywords?: string[] | null;
          pageSeoTitle?: string | null;
          pageTitle?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pages_designId_fkey";
            columns: ["designId"];
            isOneToOne: false;
            referencedRelation: "designs";
            referencedColumns: ["designId"];
          },
        ];
      };
      projects: {
        Row: {
          affiliateClientOwnerId: string | null;
          affiliateOwnerId: string | null;
          createdAt: string;
          lastUpdated: string;
          projectConfigurationDetails: string | null;
          projectDeploymentUrl: string | null;
          projectDescription: string | null;
          projectDomain: string | null;
          projectFontFamily: string | null;
          projectId: string;
          projectKeywords: string[] | null;
          projectLanguage: string | null;
          projectPrimaryColor: string | null;
          projectRegion: string | null;
          projectRepositoryUrl: string | null;
          projectSeoDescription: string | null;
          projectSeoImage: string | null;
          projectSeoKeywords: string[] | null;
          projectSeoTitle: string | null;
          projectServiceAreas: string[] | null;
          projectStatus: Database["public"]["Enums"]["ProjectStatus"];
          projectThumbnail: string | null;
          projectTitle: string;
          projectUrl: string | null;
          userId: string;
        };
        Insert: {
          affiliateClientOwnerId?: string | null;
          affiliateOwnerId?: string | null;
          createdAt?: string;
          lastUpdated: string;
          projectConfigurationDetails?: string | null;
          projectDeploymentUrl?: string | null;
          projectDescription?: string | null;
          projectDomain?: string | null;
          projectFontFamily?: string | null;
          projectId: string;
          projectKeywords?: string[] | null;
          projectLanguage?: string | null;
          projectPrimaryColor?: string | null;
          projectRegion?: string | null;
          projectRepositoryUrl?: string | null;
          projectSeoDescription?: string | null;
          projectSeoImage?: string | null;
          projectSeoKeywords?: string[] | null;
          projectSeoTitle?: string | null;
          projectServiceAreas?: string[] | null;
          projectStatus?: Database["public"]["Enums"]["ProjectStatus"];
          projectThumbnail?: string | null;
          projectTitle: string;
          projectUrl?: string | null;
          userId: string;
        };
        Update: {
          affiliateClientOwnerId?: string | null;
          affiliateOwnerId?: string | null;
          createdAt?: string;
          lastUpdated?: string;
          projectConfigurationDetails?: string | null;
          projectDeploymentUrl?: string | null;
          projectDescription?: string | null;
          projectDomain?: string | null;
          projectFontFamily?: string | null;
          projectId?: string;
          projectKeywords?: string[] | null;
          projectLanguage?: string | null;
          projectPrimaryColor?: string | null;
          projectRegion?: string | null;
          projectRepositoryUrl?: string | null;
          projectSeoDescription?: string | null;
          projectSeoImage?: string | null;
          projectSeoKeywords?: string[] | null;
          projectSeoTitle?: string | null;
          projectServiceAreas?: string[] | null;
          projectStatus?: Database["public"]["Enums"]["ProjectStatus"];
          projectThumbnail?: string | null;
          projectTitle?: string;
          projectUrl?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_affiliateClientOwnerId_fkey";
            columns: ["affiliateClientOwnerId"];
            isOneToOne: false;
            referencedRelation: "affiliate-client-users";
            referencedColumns: ["affiliateClientUserId"];
          },
          {
            foreignKeyName: "projects_affiliateOwnerId_fkey";
            columns: ["affiliateOwnerId"];
            isOneToOne: false;
            referencedRelation: "affiliate-users";
            referencedColumns: ["affiliateUserId"];
          },
        ];
      };
/// Pierson Silver :: Updating old text-box table to web-elements
      "web-elements": {
        Row: {
          projectId: string;
          navBarData: string | null;
          textBoxData: string | null;
          footerData: string | null;
        };
        Insert: {
          projectId: string;
          navBarData: string | null;
          textBoxData: string | null;
          footerData: string | null;
        };
        Update: {
          projectId: string;
          navBarData: string | null;
          textBoxData: string | null;
          footerData: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "web-elements_projectId_fkey";
            columns: ["projectId"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["projectId"];
          },
        ];
      };

      services: {
        Row: {
          createdAt: string;
          lastUpdated: string;
          projectId: string;
          serviceAreas: string[] | null;
          serviceDescription: string | null;
          serviceId: string;
          serviceImages: string[] | null;
          serviceName: string;
        };
        Insert: {
          createdAt?: string;
          lastUpdated: string;
          projectId: string;
          serviceAreas?: string[] | null;
          serviceDescription?: string | null;
          serviceId: string;
          serviceImages?: string[] | null;
          serviceName: string;
        };
        Update: {
          createdAt?: string;
          lastUpdated?: string;
          projectId?: string;
          serviceAreas?: string[] | null;
          serviceDescription?: string | null;
          serviceId?: string;
          serviceImages?: string[] | null;
          serviceName?: string;
        };
        Relationships: [
          {
            foreignKeyName: "services_projectId_fkey";
            columns: ["projectId"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["projectId"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      AffiliateClientUserStatus: "INVITED" | "ACTIVE" | "INACTIVE";
      AffiliateUserRole: "ADMIN" | "USER";
      AffiliateUserStatus: "APPLIED" | "ACTIVE" | "INACTIVE";
      DesignStatus: "DRAFT" | "PUBLISHED" | "REVISION";
      ProjectStatus: "DRAFT" | "PUBLISHED" | "DELETED";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
