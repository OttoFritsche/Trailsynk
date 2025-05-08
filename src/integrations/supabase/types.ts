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
      activities: {
        Row: {
          athlete_count: number | null
          average_cadence_rpm: number | null
          average_heartrate_bpm: number | null
          average_speed_kph: number | null
          average_watts: number | null
          comment_count: number | null
          commute: boolean | null
          created_at: string | null
          distance_km: number | null
          elapsed_time_seconds: number | null
          elevation_gain_m: number | null
          external_id: string | null
          id: string
          kudos_count: number | null
          map_polyline: string | null
          max_heartrate_bpm: number | null
          max_speed_kph: number | null
          moving_time_seconds: number | null
          name: string
          private: boolean | null
          route_id: string | null
          start_date: string
          strava_activity_id: number
          trainer: boolean | null
          type: string | null
          upload_id: number | null
          user_id: string | null
        }
        Insert: {
          athlete_count?: number | null
          average_cadence_rpm?: number | null
          average_heartrate_bpm?: number | null
          average_speed_kph?: number | null
          average_watts?: number | null
          comment_count?: number | null
          commute?: boolean | null
          created_at?: string | null
          distance_km?: number | null
          elapsed_time_seconds?: number | null
          elevation_gain_m?: number | null
          external_id?: string | null
          id?: string
          kudos_count?: number | null
          map_polyline?: string | null
          max_heartrate_bpm?: number | null
          max_speed_kph?: number | null
          moving_time_seconds?: number | null
          name: string
          private?: boolean | null
          route_id?: string | null
          start_date: string
          strava_activity_id: number
          trainer?: boolean | null
          type?: string | null
          upload_id?: number | null
          user_id?: string | null
        }
        Update: {
          athlete_count?: number | null
          average_cadence_rpm?: number | null
          average_heartrate_bpm?: number | null
          average_speed_kph?: number | null
          average_watts?: number | null
          comment_count?: number | null
          commute?: boolean | null
          created_at?: string | null
          distance_km?: number | null
          elapsed_time_seconds?: number | null
          elevation_gain_m?: number | null
          external_id?: string | null
          id?: string
          kudos_count?: number | null
          map_polyline?: string | null
          max_heartrate_bpm?: number | null
          max_speed_kph?: number | null
          moving_time_seconds?: number | null
          name?: string
          private?: boolean | null
          route_id?: string | null
          start_date?: string
          strava_activity_id?: number
          trainer?: boolean | null
          type?: string | null
          upload_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          created_at: string | null
          criteria: string | null
          description: string | null
          icon_url: string | null
          id: string
          is_hidden: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          criteria?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_hidden?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          criteria?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_hidden?: boolean | null
          name?: string
        }
        Relationships: []
      }
      bikes: {
        Row: {
          brand: string | null
          created_at: string | null
          id: string
          image_url: string | null
          initial_odometer_km: number | null
          model: string | null
          name: string | null
          purchase_date: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          brand?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          initial_odometer_km?: number | null
          model?: string | null
          name?: string | null
          purchase_date?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          brand?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          initial_odometer_km?: number | null
          model?: string | null
          name?: string | null
          purchase_date?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bikes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_items: {
        Row: {
          checklist_id: string | null
          created_at: string | null
          id: string
          is_checked: boolean | null
          item_text: string
        }
        Insert: {
          checklist_id?: string | null
          created_at?: string | null
          id?: string
          is_checked?: boolean | null
          item_text: string
        }
        Update: {
          checklist_id?: string | null
          created_at?: string | null
          id?: string
          is_checked?: boolean | null
          item_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "group_checklists"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          group_id: string | null
          id: string
          type: string
        }
        Insert: {
          created_at?: string | null
          group_id?: string | null
          id?: string
          type: string
        }
        Update: {
          created_at?: string | null
          group_id?: string | null
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      event_participants: {
        Row: {
          event_id: string | null
          id: string
          registered_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string
          registered_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string
          registered_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          date: string
          description: string | null
          id: string
          image_url: string | null
          inscription_status: string | null
          location_coordinates: Json | null
          location_name: string | null
          max_participants: number | null
          name: string
          organizer_id: string | null
          price: number | null
          route_id: string | null
          time: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          image_url?: string | null
          inscription_status?: string | null
          location_coordinates?: Json | null
          location_name?: string | null
          max_participants?: number | null
          name: string
          organizer_id?: string | null
          price?: number | null
          route_id?: string | null
          time: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          image_url?: string | null
          inscription_status?: string | null
          location_coordinates?: Json | null
          location_name?: string | null
          max_participants?: number | null
          name?: string
          organizer_id?: string | null
          price?: number | null
          route_id?: string | null
          time?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes_data"
            referencedColumns: ["id"]
          },
        ]
      }
      friends: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          updated_at: string | null
          user1_id: string | null
          user2_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user1_id?: string | null
          user2_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          user1_id?: string | null
          user2_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friends_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friends_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_checklists: {
        Row: {
          created_at: string | null
          group_id: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          group_id?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          group_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_checklists_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string | null
          member_id: string | null
          role: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          member_id?: string | null
          role?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          member_id?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string | null
          creator_id: string | null
          description: string | null
          group_type: string | null
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          group_type?: string | null
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          group_type?: string | null
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_item_images: {
        Row: {
          id: string
          image_url: string
          item_id: string | null
          order: number | null
          uploaded_at: string | null
        }
        Insert: {
          id?: string
          image_url: string
          item_id?: string | null
          order?: number | null
          uploaded_at?: string | null
        }
        Update: {
          id?: string
          image_url?: string
          item_id?: string | null
          order?: number | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_item_images_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "marketplace_items"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_items: {
        Row: {
          category: string | null
          condition: string | null
          created_at: string | null
          description: string | null
          id: string
          location: string | null
          name: string
          price: number
          seller_id: string | null
          status: string | null
        }
        Insert: {
          category?: string | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          name: string
          price: number
          seller_id?: string | null
          status?: string | null
        }
        Update: {
          category?: string | null
          condition?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          price?: number
          seller_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_items_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          id: string
          sender_id: string | null
          sent_at: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          id?: string
          sender_id?: string | null
          sent_at?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          id?: string
          sender_id?: string | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          conversation_id: string | null
          id: string
          joined_at: string | null
          user_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          id?: string
          joined_at?: string | null
          user_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          id?: string
          joined_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          cycling_preferences: Json | null
          full_name: string | null
          height: number | null
          height_cm: number | null
          id: string
          is_profile_complete: boolean | null
          objectives: Json | null
          onboarding_complete: boolean | null
          pedal_frequency: string | null
          phone: string | null
          riding_preferences: string[] | null
          username: string | null
          username_lower: string | null
          weight: number | null
          weight_kg: number | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          cycling_preferences?: Json | null
          full_name?: string | null
          height?: number | null
          height_cm?: number | null
          id: string
          is_profile_complete?: boolean | null
          objectives?: Json | null
          onboarding_complete?: boolean | null
          pedal_frequency?: string | null
          phone?: string | null
          riding_preferences?: string[] | null
          username?: string | null
          username_lower?: string | null
          weight?: number | null
          weight_kg?: number | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          cycling_preferences?: Json | null
          full_name?: string | null
          height?: number | null
          height_cm?: number | null
          id?: string
          is_profile_complete?: boolean | null
          objectives?: Json | null
          onboarding_complete?: boolean | null
          pedal_frequency?: string | null
          phone?: string | null
          riding_preferences?: string[] | null
          username?: string | null
          username_lower?: string | null
          weight?: number | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      routes_data: {
        Row: {
          coordinates: Json
          created_at: string | null
          description: string | null
          distance_km: number | null
          elevation_gain_m: number | null
          id: string
          name: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          coordinates: Json
          created_at?: string | null
          description?: string | null
          distance_km?: number | null
          elevation_gain_m?: number | null
          id?: string
          name: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          coordinates?: Json
          created_at?: string | null
          description?: string | null
          distance_km?: number | null
          elevation_gain_m?: number | null
          id?: string
          name?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_pedals: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string
          description: string | null
          group_id: string | null
          id: string
          location_coordinates: Json | null
          location_name: string | null
          name: string
          route_id: string | null
          time: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date: string
          description?: string | null
          group_id?: string | null
          id?: string
          location_coordinates?: Json | null
          location_name?: string | null
          name: string
          route_id?: string | null
          time: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string
          description?: string | null
          group_id?: string | null
          id?: string
          location_coordinates?: Json | null
          location_name?: string | null
          name?: string
          route_id?: string | null
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_pedals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_pedals_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_pedals_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes_data"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string | null
          conquered_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          badge_id?: string | null
          conquered_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          badge_id?: string | null
          conquered_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_connections: {
        Row: {
          access_token: string | null
          created_at: string
          expires_at: string | null
          id: string
          other_details: Json | null
          provider: string
          provider_user_id: string
          refresh_token: string | null
          scopes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          other_details?: Json | null
          provider: string
          provider_user_id: string
          refresh_token?: string | null
          scopes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          other_details?: Json | null
          provider?: string
          provider_user_id?: string
          refresh_token?: string | null
          scopes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          id: string
          last_updated_at: string | null
          total_distance_km: number | null
          total_elapsed_time_seconds: number | null
          total_elevation_gain_m: number | null
          total_pedals: number | null
          user_id: string | null
        }
        Insert: {
          id?: string
          last_updated_at?: string | null
          total_distance_km?: number | null
          total_elapsed_time_seconds?: number | null
          total_elevation_gain_m?: number | null
          total_pedals?: number | null
          user_id?: string | null
        }
        Update: {
          id?: string
          last_updated_at?: string | null
          total_distance_km?: number | null
          total_elapsed_time_seconds?: number | null
          total_elevation_gain_m?: number | null
          total_pedals?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist_leads: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
