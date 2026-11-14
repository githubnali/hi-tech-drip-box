import { useRef, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  AlertCircle,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Ruler,
  Send,
  User,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { enquirySchema, MODEL_OPTIONS, type EnquiryFormValues } from '@/lib/validation';
import {
  getRateLimitRemaining,
  getWhatsAppFallbackUrl,
  isSupabaseConfigured,
  markSubmission,
  openWhatsApp,
  saveEnquiryToSupabase,
} from '@/lib/enquiry';
import type { EnquiryInput } from '@/types';
import { cn } from '@/lib/utils';

function FieldShell({
  id,
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <>
            <span className="ml-0.5 text-red-600" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="ml-1 font-normal text-muted/70">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1 text-[0.7rem] leading-snug text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 flex items-start gap-1 text-[0.72rem] font-medium leading-snug text-red-600">
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm() {
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const mountedAt = useRef(Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      mobile: '',
      email: '',
      city: '',
      model: '',
      terraceArea: '',
      message: '',
      website: '',
    },
  });

  const describe = (id: string, error?: string) => (error ? `${id}-error` : undefined);

  const onSubmit = async (values: EnquiryFormValues) => {
    setConfirmation(null);
    setSubmitError(null);
    setFallbackUrl(null);

    if (values.website) return;

    if (Date.now() - mountedAt.current < 1200) {
      setSubmitError('Please take a moment to check your details, then submit the enquiry again.');
      return;
    }

    const waitMs = getRateLimitRemaining();
    if (waitMs > 0) {
      setSubmitError(`Please wait ${Math.ceil(waitMs / 1000)} seconds before sending another enquiry.`);
      return;
    }

    const payload: EnquiryInput = {
      fullName: values.fullName.trim(),
      mobile: values.mobile.trim(),
      email: values.email?.trim() || undefined,
      city: values.city.trim(),
      model: values.model || undefined,
      terraceArea: values.terraceArea?.trim() || undefined,
      message: values.message?.trim() || undefined,
    };

    if (isSupabaseConfigured) {
      try {
        await saveEnquiryToSupabase(payload);
        markSubmission();
        setConfirmation(
          'Thank you — your enquiry has been received. Alexander will contact you using the details you shared.',
        );
        reset();
        toast.success('Enquiry received.');
      } catch {
        const url = getWhatsAppFallbackUrl(payload);
        setFallbackUrl(url);
        setSubmitError(
          'We could not send your enquiry right now. Please call Alexander, or send the same details on WhatsApp using the link below.',
        );
        toast.error('Enquiry could not be sent.');
      }
      return;
    }

    const url = getWhatsAppFallbackUrl(payload);
    const opened = openWhatsApp(url);
    markSubmission();
    setFallbackUrl(url);

    const message = opened
      ? 'WhatsApp has opened with your enquiry. Press Send inside WhatsApp to deliver it to Alexander.'
      : 'Your enquiry is ready — use the WhatsApp link below and press Send to deliver it to Alexander.';
    setConfirmation(message);
    toast(message, { duration: 10000 });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6" aria-describedby="enquiry-form-note">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell id="fullName" label="Full Name" required error={errors.fullName?.message}>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-600/70"
              aria-hidden="true"
            />
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              className="field pl-10"
              placeholder="Your name"
              maxLength={80}
              aria-required="true"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={describe('fullName', errors.fullName?.message)}
              {...register('fullName')}
            />
          </div>
        </FieldShell>

        <FieldShell id="mobile" label="Mobile Number" required error={errors.mobile?.message}>
          <div className="relative">
            <Phone
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-600/70"
              aria-hidden="true"
            />
            <input
              id="mobile"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="field pl-10"
              placeholder="e.g. 98840 35450"
              maxLength={16}
              aria-required="true"
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={describe('mobile', errors.mobile?.message)}
              {...register('mobile')}
            />
          </div>
        </FieldShell>

        <FieldShell id="email" label="Email Address" error={errors.email?.message}>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-600/70"
              aria-hidden="true"
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="field pl-10"
              placeholder="you@example.com"
              maxLength={120}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describe('email', errors.email?.message)}
              {...register('email')}
            />
          </div>
        </FieldShell>

        <FieldShell id="city" label="City / Location" required error={errors.city?.message}>
          <div className="relative">
            <MapPin
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-600/70"
              aria-hidden="true"
            />
            <input
              id="city"
              type="text"
              autoComplete="address-level2"
              className="field pl-10"
              placeholder="Your city or area"
              maxLength={80}
              aria-required="true"
              aria-invalid={Boolean(errors.city)}
              aria-describedby={describe('city', errors.city?.message)}
              {...register('city')}
            />
          </div>
        </FieldShell>

        <FieldShell id="model" label="Interested Model" error={errors.model?.message}>
          <div className="relative">
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-600/70"
              aria-hidden="true"
            />
            <select id="model" className="field appearance-none pr-10" {...register('model')}>
              <option value="">Select a model</option>
              {MODEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </FieldShell>

        <FieldShell
          id="terraceArea"
          label="Approximate Terrace Area"
          error={errors.terraceArea?.message}
          hint="For example: 300 sq. ft."
        >
          <div className="relative">
            <Ruler
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-600/70"
              aria-hidden="true"
            />
            <input
              id="terraceArea"
              type="text"
              className="field pl-10"
              placeholder="e.g. 300 sq. ft."
              maxLength={60}
              aria-invalid={Boolean(errors.terraceArea)}
              aria-describedby={
                errors.terraceArea?.message ? 'terraceArea-error' : 'terraceArea-hint'
              }
              {...register('terraceArea')}
            />
          </div>
        </FieldShell>

        <FieldShell
          id="message"
          label="Message"
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <div className="relative">
            <MessageSquare
              className="pointer-events-none absolute left-3.5 top-4 h-4 w-4 text-forest-600/70"
              aria-hidden="true"
            />
            <textarea
              id="message"
              rows={4}
              className="field resize-y pl-10"
              placeholder="Tell us about your terrace, plants you would like to grow, or any questions."
              maxLength={700}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describe('message', errors.message?.message)}
              {...register('message')}
            />
          </div>
        </FieldShell>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        className="mt-5"
        disabled={isSubmitting}
        icon={
          isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-[18px] w-[18px]" aria-hidden="true" />
          )
        }
      >
        {isSubmitting ? 'Sending…' : 'Submit Enquiry'}
      </Button>

      <p id="enquiry-form-note" className="mt-3 text-center text-[0.72rem] leading-relaxed text-muted">
        {isSupabaseConfigured
          ? 'Your details are stored securely and used only to respond to your enquiry.'
          : 'This form prepares a WhatsApp message addressed to Alexander. You will need to press Send inside WhatsApp. Your details are only used to respond to your enquiry.'}
      </p>

      <div aria-live="polite" className="mt-3">
        {confirmation ? (
          <div
            role="status"
            className="rounded-xl border border-leaf-300 bg-leaf-100 px-4 py-3 text-[0.8rem] leading-relaxed text-forest-900"
          >
            {confirmation}
            {fallbackUrl ? (
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 block font-semibold underline underline-offset-4"
              >
                Open WhatsApp with these details
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      {submitError ? (
        <div
          role="alert"
          className={cn(
            'mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[0.8rem] leading-relaxed text-red-800',
          )}
        >
          {submitError}
          {fallbackUrl ? (
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 block font-semibold underline underline-offset-4"
            >
              Send these details on WhatsApp instead
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
