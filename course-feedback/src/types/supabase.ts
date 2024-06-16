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
      course_reviews: {
        Row: {
          advice: string | null
          comments_course: string | null
          comments_professor: string | null
          course_content: string | null
          created_at: string
          deleted_at: string | null
          id: number
          raw_course_review_id: number | null
          semester: string | null
        }
        Insert: {
          advice?: string | null
          comments_course?: string | null
          comments_professor?: string | null
          course_content?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: number
          raw_course_review_id?: number | null
          semester?: string | null
        }
        Update: {
          advice?: string | null
          comments_course?: string | null
          comments_professor?: string | null
          course_content?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: number
          raw_course_review_id?: number | null
          semester?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_reviews_raw_course_review_id_fkey"
            columns: ["raw_course_review_id"]
            isOneToOne: false
            referencedRelation: "raw_course_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          course_section: string | null
          created_at: string | null
          deleted_at: string | null
          id: number
          instructors: string | null
          link: string | null
          major: string | null
          semester: string | null
        }
        Insert: {
          course_section?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          instructors?: string | null
          link?: string | null
          major?: string | null
          semester?: string | null
        }
        Update: {
          course_section?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: number
          instructors?: string | null
          link?: string | null
          major?: string | null
          semester?: string | null
        }
        Relationships: []
      }
      instructor_reviews: {
        Row: {
          course_id: number
          created_at: string
          id: number
          instructor_id: number
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          instructor_id: number
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          instructor_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "instructor_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instructor_reviews_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      raw_course_reviews: {
        Row: {
          course_id: number
          created_at: string
          deleted_at: string | null
          id: number
          is_summarized: boolean | null
          raw_data: Json | null
        }
        Insert: {
          course_id: number
          created_at?: string
          deleted_at?: string | null
          id?: number
          is_summarized?: boolean | null
          raw_data?: Json | null
        }
        Update: {
          course_id?: number
          created_at?: string
          deleted_at?: string | null
          id?: number
          is_summarized?: boolean | null
          raw_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "raw_course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
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
