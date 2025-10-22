/**
 * Edge DataHub SDK - TypeScript Version
 * Simple SDK for Event Gamification
 * Para eventos con conectividad intermitente
 */

export class EdgeDataHubSDK {
  private baseUrl: string;
  private eventId: string;
  private eventExperienceId: string;

  constructor() {
    // this.baseUrl = "http://localhost:3000/api/edge";
    this.baseUrl = "http://192.168.1.10:3000/api/edge";
    //this.baseUrl = "http://localhost:3000/api/edge";

    // Event configuration - HARDCODED IDs for this implementation
    this.eventId = "bf50d11c-2571-4270-9535-994d2931a06b"; // HARDCODED: ID del evento
    this.eventExperienceId = "a6f8b2b7-8339-438f-865c-ed3469f16825"; // HARDCODED: ID de la experiencia
  }

  // ===== OPERACIONES PRINCIPALES =====

  /**
   * Registra un asistente
   * @param data - Datos del asistente (eventId se agrega automáticamente)
   * @returns Promise con la respuesta del servidor
   */
  async registerAttendee(
    data: AttendeeRegisterRequest
  ): Promise<AttendeeResponse> {
    // Validar campos requeridos
    this.validateRequiredFields(data, ["fullName", "email"]);

    // Agregar eventId automáticamente
    const payload = {
      ...data,
      eventId: this.eventId,
    };

    const response = await fetch(`${this.baseUrl}/attendees/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(
        `Error registrando asistente: ${errorData.message || response.statusText
        }`
      );
    }

    return await response.json();
  }

  /**
   * Busca asistente por código
   * @param code - Código único del asistente
   * @returns Promise con los datos del asistente
   */
  async findAttendeeByCode(code: string): Promise<AttendeeResponse> {
    const url = `${this.baseUrl}/attendees/${encodeURIComponent(code)}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (e: any) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(`Error buscando asistente: ${errorMessage}`);
      }

      try {
        return JSON.parse(responseText);
      } catch (e) {
        console.error('Error al parsear la respuesta JSON:', e);
        throw new Error('La respuesta del servidor no es un JSON válido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }

  /**
   * Registra jugada en experiencia
   * @param data - Datos de la jugada (eventExperienceId se agrega automáticamente)
   * @returns Promise con la respuesta del servidor
   */
  async logExperiencePlay(
    data: ExperiencePlayRequest
  ): Promise<ExperiencePlayResponse> {
    // Validar campos requeridos
    this.validateRequiredFields(data, [
      "attendeeId",
      "play_timestamp",
      "score",
    ]);

    // Agregar eventExperienceId automáticamente
    const payload = {
      ...data,
      eventExperienceId: this.eventExperienceId,
    };

    const response = await fetch(`${this.baseUrl}/experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(
        `Error registrando jugada: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  }

  /**
   * Redime puntos
   * @param data - Datos de redención (eventId se agrega automáticamente)
   * @returns Promise con la respuesta del servidor
   */
  async redeemPoints(data: RedemptionRequest): Promise<RedemptionResponse> {
    // Validar campos requeridos
    this.validateRequiredFields(data, [
      "attendeeId",
      "pointsRedeemed",
      "reason",
    ]);

    // Agregar eventId automáticamente
    const payload = {
      ...data,
      eventId: this.eventId,
    };

    const response = await fetch(`${this.baseUrl}/redemption`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(
        `Error redimiendo puntos: ${errorData.message || response.statusText}`
      );
    }

    return await response.json();
  }

  // ===== UTILIDADES =====

  /**
   * Valida que los campos requeridos estén presentes
   * @param data - Datos a validar
   * @param requiredFields - Campos requeridos
   */
  private validateRequiredFields(
    data: Record<string, any>,
    requiredFields: string[]
  ): void {
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`❌ Campo requerido faltante: ${field}`);
      }
    }
  }

  /**
   * Obtiene la URL base configurada
   * @returns URL base del SDK
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Obtiene el ID del evento (hardcoded)
   * @returns ID del evento
   */
  getEventId(): string {
    return this.eventId;
  }

  /**
   * Obtiene el ID de la experiencia (hardcoded)
   * @returns ID de la experiencia
   */
  getEventExperienceId(): string {
    return this.eventExperienceId;
  }
}

// Exportar tipos para uso externo
/**
 * Edge DataHub SDK Types
 * TypeScript definitions for the Edge DataHub SDK
 */

export interface SDKConfig {
  baseUrl: string;
}

export interface AttendeeRegisterRequest {
  fullName: string;
  email: string;
  country?: string;
  city?: string;
  properties?: Record<string, any>;
}

export interface ExperiencePlayRequest {
  attendeeId: string;
  play_timestamp: string;
  score: number;
  bonusScore?: number;
  modePoints?: "firstTry" | "betterTry";
  data?: Record<string, any>;
}

export interface RedemptionRequest {
  attendeeId: string;
  pointsRedeemed: number;
  reason: string;
}

export interface AttendeeResponse {
  message: string;
  attendee: {
    id: string;
    code: string;
    fullName: string;
    email: string;
    country?: string;
    city?: string;
    properties?: Record<string, any>;
  };
}

export interface ExperiencePlayResponse {
  message: string;
  experiencePlay?: {
    id: string;
    attendeeId: string;
    eventExperienceId: string;
    play_timestamp: string;
    score: number;
    bonusScore?: number;
    modePoints?: string;
    data?: Record<string, any>;
  };
}

export interface RedemptionResponse {
  message: string;
  redemption?: {
    id: string;
    attendeeId: string;
    eventId: string;
    pointsRedeemed: number;
    reason: string;
    timestamp: string;
  };
}

export interface ErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

// Initialize SDK
export const edgeDataHubSDK = new EdgeDataHubSDK();
