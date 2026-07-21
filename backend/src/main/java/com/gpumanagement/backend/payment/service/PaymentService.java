package com.gpumanagement.backend.payment.service;

import com.gpumanagement.backend.auth.service.JwtService;
import com.gpumanagement.backend.common.enums.PaymentStatus;
import com.gpumanagement.backend.payment.model.Payment;
import com.gpumanagement.backend.payment.repository.PaymentRepository;
import com.gpumanagement.backend.report.model.UsageReport;
import com.gpumanagement.backend.report.repository.UsageReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UsageReportRepository usageReportRepository;
    private final JwtService jwtService;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));
    }

    public List<Payment> getMyPayments(String email) {
        return paymentRepository.findByUserEmail(email);
    }

    public Payment createPayment(
            Long reportId,
            String paymentMethod
    ) {
        UsageReport report = usageReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));

        if (report.getAssignment() == null) {
            throw new RuntimeException("El reporte no tiene una asignación relacionada");
        }

        if (report.getUser() == null) {
            throw new RuntimeException("El reporte no tiene un usuario relacionado");
        }

        if (report.getEstimatedCost() == null) {
            throw new RuntimeException("El reporte no tiene un costo estimado");
        }

        paymentRepository.findByReportId(reportId)
                .ifPresent(existingPayment -> {
                    throw new RuntimeException(
                            "Ya existe un pago generado para este reporte"
                    );
                });

        Payment payment = Payment.builder()
                .paymentDate(LocalDateTime.now())
                .amount(report.getEstimatedCost())
                .status(PaymentStatus.PENDING)
                .paymentMethod(paymentMethod)
                .transactionCode(generateTransactionCode())
                .report(report)
                .assignment(report.getAssignment())
                .user(report.getUser())
                .build();

        return paymentRepository.save(payment);
    }

    public Payment updatePaymentStatus(
            Long paymentId,
            PaymentStatus status
    ) {
        Payment payment = getPaymentById(paymentId);

        payment.setStatus(status);

        if (status == PaymentStatus.PAID) {
            payment.setPaymentDate(LocalDateTime.now());
        }

        return paymentRepository.save(payment);
    }

    public void deletePayment(Long id) {
        Payment payment = getPaymentById(id);
        paymentRepository.delete(payment);
    }

    public String getEmailFromToken(String token) {
        return jwtService.extractUsername(token);
    }

    private String generateTransactionCode() {
        return "PAY-" + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();
    }
}
