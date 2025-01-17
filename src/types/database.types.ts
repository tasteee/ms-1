export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      artists: {
        Row: {
          about: string | null
          aio: string
          avatar: string | null
          id: string
          name: string
        }
        Insert: {
          about?: string | null
          aio: string
          avatar?: string | null
          id?: string
          name: string
        }
        Update: {
          about?: string | null
          aio?: string
          avatar?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      items: {
        Row: {
          about: string | null
          blocks_file: string
          colors: string[] | null
          file: string
          glow_color: string | null
          glow_intensity: number | null
          glow_position_x: number | null
          glow_position_y: number | null
          glow_position_z: number | null
          glow_radius: number | null
          id: string
          is_glowing: boolean | null
          is_obstructive: boolean | null
          name: string
          origin_id: string | null
          position_x: number | null
          position_y: number | null
          position_z: number | null
          rotation_x: number | null
          rotation_y: number | null
          rotation_z: number | null
          scale_x: number | null
          scale_y: number | null
          scale_z: number | null
          size_x: number
          size_y: number
          size_z: number
          space_id: string | null
        }
        Insert: {
          about?: string | null
          blocks_file: string
          colors?: string[] | null
          file: string
          glow_color?: string | null
          glow_intensity?: number | null
          glow_position_x?: number | null
          glow_position_y?: number | null
          glow_position_z?: number | null
          glow_radius?: number | null
          id?: string
          is_glowing?: boolean | null
          is_obstructive?: boolean | null
          name: string
          origin_id?: string | null
          position_x?: number | null
          position_y?: number | null
          position_z?: number | null
          rotation_x?: number | null
          rotation_y?: number | null
          rotation_z?: number | null
          scale_x?: number | null
          scale_y?: number | null
          scale_z?: number | null
          size_x: number
          size_y: number
          size_z: number
          space_id?: string | null
        }
        Update: {
          about?: string | null
          blocks_file?: string
          colors?: string[] | null
          file?: string
          glow_color?: string | null
          glow_intensity?: number | null
          glow_position_x?: number | null
          glow_position_y?: number | null
          glow_position_z?: number | null
          glow_radius?: number | null
          id?: string
          is_glowing?: boolean | null
          is_obstructive?: boolean | null
          name?: string
          origin_id?: string | null
          position_x?: number | null
          position_y?: number | null
          position_z?: number | null
          rotation_x?: number | null
          rotation_y?: number | null
          rotation_z?: number | null
          scale_x?: number | null
          scale_y?: number | null
          scale_z?: number | null
          size_x?: number
          size_y?: number
          size_z?: number
          space_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_origin_id_fkey"
            columns: ["origin_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          about: string
          artist: string | null
          artist_ids: string[]
          categories: string[] | null
          colors: string[] | null
          deleted_instance_count: number | null
          file: string
          glow_color: string | null
          glow_intensity: number | null
          glow_position_x: number | null
          glow_position_y: number | null
          glow_position_z: number | null
          glow_radius: number | null
          id: string
          instance_count: number | null
          is_glowing: boolean | null
          is_obstructive: boolean | null
          mass: number | null
          name: string
          scale_x: number | null
          scale_y: number | null
          scale_z: number | null
          size_x: number
          size_y: number
          size_z: number
          tags: string[] | null
          thumbnail: string | null
        }
        Insert: {
          about: string
          artist?: string | null
          artist_ids: string[]
          categories?: string[] | null
          colors?: string[] | null
          deleted_instance_count?: number | null
          file: string
          glow_color?: string | null
          glow_intensity?: number | null
          glow_position_x?: number | null
          glow_position_y?: number | null
          glow_position_z?: number | null
          glow_radius?: number | null
          id?: string
          instance_count?: number | null
          is_glowing?: boolean | null
          is_obstructive?: boolean | null
          mass?: number | null
          name: string
          scale_x?: number | null
          scale_y?: number | null
          scale_z?: number | null
          size_x: number
          size_y: number
          size_z: number
          tags?: string[] | null
          thumbnail?: string | null
        }
        Update: {
          about?: string
          artist?: string | null
          artist_ids?: string[]
          categories?: string[] | null
          colors?: string[] | null
          deleted_instance_count?: number | null
          file?: string
          glow_color?: string | null
          glow_intensity?: number | null
          glow_position_x?: number | null
          glow_position_y?: number | null
          glow_position_z?: number | null
          glow_radius?: number | null
          id?: string
          instance_count?: number | null
          is_glowing?: boolean | null
          is_obstructive?: boolean | null
          mass?: number | null
          name?: string
          scale_x?: number | null
          scale_y?: number | null
          scale_z?: number | null
          size_x?: number
          size_y?: number
          size_z?: number
          tags?: string[] | null
          thumbnail?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "models_artist_fkey"
            columns: ["artist"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          about: string | null
          categories: string[] | null
          color: string | null
          depth: number | null
          gravity: number | null
          height: number | null
          id: string
          name: string
          spawn_position_x: number | null
          spawn_position_y: number | null
          spawn_position_z: number | null
          tags: string[] | null
          thumbnail: string | null
          visitor_count: number | null
          width: number | null
        }
        Insert: {
          about?: string | null
          categories?: string[] | null
          color?: string | null
          depth?: number | null
          gravity?: number | null
          height?: number | null
          id?: string
          name: string
          spawn_position_x?: number | null
          spawn_position_y?: number | null
          spawn_position_z?: number | null
          tags?: string[] | null
          thumbnail?: string | null
          visitor_count?: number | null
          width?: number | null
        }
        Update: {
          about?: string | null
          categories?: string[] | null
          color?: string | null
          depth?: number | null
          gravity?: number | null
          height?: number | null
          id?: string
          name?: string
          spawn_position_x?: number | null
          spawn_position_y?: number | null
          spawn_position_z?: number | null
          tags?: string[] | null
          thumbnail?: string | null
          visitor_count?: number | null
          width?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
