/**
 * Sticky_Step_Section content module (Requirement 12.3).
 *
 * `MeshChatSection` is the one Landing_Section that receives the Sticky_Step
 * treatment (Requirement 12.1), because offline nearby chat is genuinely
 * sequential: devices are discovered, the message is encrypted, it is relayed
 * hop by hop, and it arrives. Numbered steps therefore explain something real.
 *
 * Content boundary: every claim here is already part of App_Feature_Set —
 * nearby devices over Bluetooth and Wi-Fi Direct with no internet connection,
 * multi-hop store-and-forward relaying, and relayed messages staying end-to-end
 * encrypted. Nothing beyond that is described, and no transport, SDK or vendor
 * detail is invented.
 */

/**
 * Identifies the abstract diagram rendered beside (or pinned next to) a step.
 * The diagrams are decorative and `aria-hidden`; the step title and description
 * carry the whole meaning (Requirement 12.3).
 */
export type MeshStepVisualId = 'discover' | 'encrypt' | 'relay' | 'delivered';

export interface MeshStep {
  /** Stable slug — React key and test selector. */
  readonly id: string;
  /** 1-based position, rendered as the step's numeric ordinal. */
  readonly ordinal: number;
  /** Step title, rendered one heading level below the section heading. */
  readonly title: string;
  /** One or two sentences. */
  readonly description: string;
  /** Which diagram the step is illustrated with. */
  readonly visualId: MeshStepVisualId;
  /** Short caption printed inside the diagram. */
  readonly visualCaption: string;
}

export const MESH_STEPS: readonly MeshStep[] = [
  {
    id: 'discover',
    ordinal: 1,
    title: 'Find the phones around you',
    description:
      'GupShupGo looks for nearby devices over Bluetooth and Wi-Fi Direct. A chat can start with no internet connection, no mobile data and no Wi-Fi router in between.',
    visualId: 'discover',
    visualCaption: 'Nearby devices found',
  },
  {
    id: 'encrypt',
    ordinal: 2,
    title: 'Write it, encrypt it',
    description:
      'Your message is end-to-end encrypted on your own phone before it leaves it. Only the person you are chatting with can read what comes out the other end.',
    visualId: 'encrypt',
    visualCaption: 'Encrypted before it leaves',
  },
  {
    id: 'relay',
    ordinal: 3,
    title: 'Hop from phone to phone',
    description:
      'A friend out of direct range still hears from you. Multi-hop store-and-forward relaying lets each nearby device hold the message and carry it one hop closer when the next device comes into range.',
    visualId: 'relay',
    visualCaption: 'Store, forward, repeat',
  },
  {
    id: 'delivered',
    ordinal: 4,
    title: 'Delivered, still private',
    description:
      'The message arrives without ever touching the internet. The devices that relayed it moved the traffic along without being able to read it.',
    visualId: 'delivered',
    visualCaption: 'Arrived, never online',
  },
];
