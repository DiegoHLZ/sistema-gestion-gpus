package com.gpumanagement.backend.payment.controller;

import com.gpumanagement.backend.common.enums.PaymentStatus;
import com.gpumanagement.backend.payment.model.Payment;
import com.gpumanagement.backend.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(
                paymentService.getAllPayments()
        );
    }

    @GetMapping("/my-payments")
    public ResponseEntity<List<Payment>> getMyPayments(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        String token = authorizationHeader.replace("Bearer ", "");
        String email = paymentService.getEmailFromToken(token);

        return ResponseEntity.ok(
                paymentService.getMyPayments(email)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                paymentService.getPaymentById(id)
        );
    }

    @PostMapping
    public ResponseEntity<Payment> createPayment(
            @RequestParam Long reportId,
            @RequestParam String paymentMethod
    ) {
        return ResponseEntity.ok(
                paymentService.createPayment(reportId, paymentMethod)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Payment> updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam PaymentStatus status
    ) {
        return ResponseEntity.ok(
                paymentService.updatePaymentStatus(id, status)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(
            @PathVariable Long id
    ) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}
